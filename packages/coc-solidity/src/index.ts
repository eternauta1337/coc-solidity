import * as coc from 'coc.nvim'
import {
  WorkspaceFolder
} from 'vscode-languageserver-protocol'
import { Compiler } from './compiler';
// import { compileActiveContract, initDiagnosticCollection } from './compileActive';

const logger = require('coc.nvim/lib/util/logger')('workspace')

let diagnosticCollection: coc.DiagnosticCollection
let compiler: Compiler

export async function activate(context: coc.ExtensionContext): Promise<void> {
  coc.workspace.showMessage(`coc-solidity works!`);
  logger.info('>>> coc-solidity activate called')

  const ws: WorkspaceFolder[] = coc.workspace.workspaceFolders
  diagnosticCollection = coc.languages.createDiagnosticCollection('solidity')
  compiler = new Compiler(context.extensionPath);

  context.subscriptions.push(diagnosticCollection)

  // initDiagnosticCollection(diagnosticCollection);
}
