import * as path from 'path';
import * as coc from 'coc.nvim';
import { Compiler } from './compiler';

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

  // TODO: Remove when porting continues.
  coc.workspace.showMessage('WOULD COMPILE>')

  // // Check if is folder, if not stop we need to output to a bin folder on rootPath
  // if (vscode.workspace.workspaceFolders[0] === undefined) {
  //     vscode.window.showWarningMessage('Please open a folder in Visual Studio Code as a workspace');
  //     return;
  // }

  // const contractsCollection = new ContractCollection();
  // const contractCode = editor.document.getText();
  // const contractPath = editor.document.fileName;

  // const packageDefaultDependenciesDirectory = vscode.workspace.getConfiguration('solidity').get<string>('packageDefaultDependenciesDirectory');
  // const packageDefaultDependenciesContractsDirectory = vscode.workspace.getConfiguration('solidity').get<string>('packageDefaultDependenciesContractsDirectory');
  // const compilationOptimisation = vscode.workspace.getConfiguration('solidity').get<number>('compilerOptimization');
  // const project = initialiseProject(vscode.workspace.workspaceFolders[0].uri.fsPath, packageDefaultDependenciesDirectory, packageDefaultDependenciesContractsDirectory);
  // const contract = contractsCollection.addContractAndResolveImports(contractPath, contractCode, project);
  // const packagesPath = formatPath(project.packagesDir);

  // return compiler.compile(contractsCollection.getDefaultContractsForCompilation(compilationOptimisation),
  //         diagnosticCollection,
  //         project.projectPackage.build_dir,
  //         project.projectPackage.absoluletPath,
  //         null,
  //         packagesPath,
  //         contract.absolutePath);

  // TODO: Remove after returning something real.
  return new Promise(res => { res([]) })
}
