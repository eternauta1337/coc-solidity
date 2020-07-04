import * as coc from 'coc.nvim';

export async function activate(context: coc.ExtensionContext): Promise<void> {
  coc.workspace.showMessage(`coc-solidity works!`);

  context.subscriptions.push(
    coc.commands.registerCommand('coc-solidity.testCommand', async () => {
      coc.workspace.showMessage(`coc-solidity testCommand works!`)
    }),
  )
}
