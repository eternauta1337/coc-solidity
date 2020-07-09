import * as coc from 'coc.nvim';
import { Compiler } from './compiler';
import { ContractCollection } from './model/contractsCollection';
import { URI } from 'vscode-uri'
import { initialiseProject } from './projectService';
import { formatPath } from './util';

let diagnosticCollection: coc.DiagnosticCollection;

export function initDiagnosticCollection(diagnostics: coc.DiagnosticCollection) {
  diagnosticCollection = diagnostics;
}

export async function compileActiveContract(compiler: Compiler): Promise<Array<string> | null> {
  const editor = await coc.workspace.document;

  if (!editor) {
    return null; // We need something open
  }

  if (editor.filetype != 'solidity') {
    coc.workspace.showMessage('WARNING: This not a solidity file (*.sol)');
    return null;
  }

  // Check if is folder, if not stop we need to output to a bin folder on rootPath
  if (coc.workspace.workspaceFolders[0] == undefined) {
    coc.workspace.showMessage('Please open a folder in Vim as a workspace');
    return null;
  }

  const contractsCollection = new ContractCollection();
  const contractCode = editor.content
  const contractUri = URI.parse(editor.uri)
  const contractPath = contractUri.fsPath

  const packageDefaultDependenciesDirectory = coc.workspace.getConfiguration('solidity').get<string>('packageDefaultDependenciesDirectory');
  const packageDefaultDependenciesContractsDirectory = coc.workspace.getConfiguration('solidity').get<string>('packageDefaultDependenciesContractsDirectory');
  const compilationOptimisation = coc.workspace.getConfiguration('solidity').get<number>('compilerOptimization');
  const projectUri = coc.workspace.workspaceFolders[0].uri
  const projectPath = URI.parse(projectUri).fsPath
  const project = initialiseProject(projectPath, packageDefaultDependenciesDirectory!, packageDefaultDependenciesContractsDirectory!);
  const contract = contractsCollection.addContractAndResolveImports(contractPath, contractCode, project)!;
  const packagesPath = formatPath(project.packagesDir);

  const defaultContracts = contractsCollection.getDefaultContractsForCompilation(compilationOptimisation)
  return compiler.compile(
    defaultContracts,
    diagnosticCollection,
    project.projectPackage.build_dir,
    project.projectPackage.absoluletPath,
    null,
    packagesPath,
    contract.absolutePath
  );
}
