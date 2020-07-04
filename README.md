# coc-solidity
### Work in progress!!

> fork from [vscode-solidity](https://github.com/juanfranblanco/vscode-solidity) at [this commit](https://github.com/juanfranblanco/vscode-solidity/commit/2b87c8f3b794febc52eede4acd09642c2726e792)
Port of Juan Blanco's Solidity plugin for VSCode to vim8/neovim, based on [coc.nvim](https://github.com/neoclide/coc.nvim).

### Porting strategy

* packages/coc-solidity was created with [create-coc-extension](https://github.com/fannheyward/create-coc-extension) and stripped to act as an entry point that will receive code from vscode-solidity.
* packages/vscode-solidity is a hard copy of vscode-solidity at the specified commit + some minimal changes to compile.
* packages/coc-solidity will always be functional. This means that it should always compile, as it receives code incrementally from packages/vscode-solidity.
* see [create-coc-extension](https://github.com/fannheyward/create-coc-extension) for how to run packages/coc-solidity locally. Make sure you've set up coc.nvim, and added packages/coc-solidity to vim's runtime in your vim config. In my case, it's `set runtimepath^=~/coc-solidity/packages/coc-solidity`.
* To debug packages/vscode-solidity, simply open the package with vscode, and debug `.vscode/launch.json`.
* I didn't find specific documentation on how to port a vscode extension to coc, but I found it useful to compare other coc extensions with the repository they fork from. To do this,
  * Identify a coc extension that forks from a vscode extension in [Using-coc-extensions](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions) and clone it, e.g. coc-spell-checker.
  * Find where exactly it forks from the original repo, e.g. vscode-spell-checker, and clone that as well.
  * Rewind coc-spell-checker to its first commit.
  * Delete all files in vscode-spell-checker.
  * Paste all files from coc-spell-checker into vscode-spell-cheker.
  * Use your favorite diff viewer to see what gets changed to port an extension.
  * Additionally, comparing commits in coc-spell-checker could provide additional insights for how to port.
* After coc-solidity is functional, packages/coc-solidity should be hoisted up a level and packages/ deleted.
