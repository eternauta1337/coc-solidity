import * as coc from 'coc.nvim'
import {
  WorkspaceFolder
} from 'vscode-languageserver-protocol'
import { Compiler } from './compiler';
import { /*compileActiveContract, */initDiagnosticCollection } from './compileActive';

const logger = require('coc.nvim/lib/util/logger')('workspace')

let diagnosticCollection: coc.DiagnosticCollection
let compiler: Compiler

export async function activate(context: coc.ExtensionContext): Promise<void> {
  coc.workspace.showMessage(`coc-solidity works!`);
  logger.info('>>> coc-solidity activate called');

  const ws: WorkspaceFolder[] = coc.workspace.workspaceFolders;
  diagnosticCollection = coc.languages.createDiagnosticCollection('solidity');
  compiler = new Compiler(context.extensionPath);

  /*
  const configuration = vscode.workspace.getConfiguration('solidity');
  const cacheConfiguration = configuration.get<string>('solcCache');
  if (typeof cacheConfiguration === 'undefined' || cacheConfiguration === null) {
      configuration.update('solcCache', context.extensionPath, vscode.ConfigurationTarget.Global);
  }*/

  /* WSL is affected by this
  workspace.onDidChangeConfiguration(async (event) => {
      if (event.affectsConfiguration('solidity.enableLocalNodeCompiler') ||
          event.affectsConfiguration('solidity.compileUsingRemoteVersion') ||
          event.affectsConfiguration('solidity.compileUsingLocalVersion')) {
          await initialiseCompiler();
      }
  });
  */

  context.subscriptions.push(diagnosticCollection)

  initDiagnosticCollection(diagnosticCollection);
}
