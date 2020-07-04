# coc-solidity

### :construction: :construction: :construction: Work in progress!! :construction: :construction: :construction:

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

### Porting tips

**Compiling the extension**
* `cd packages/coc-solidity`
* `yarn watch`

**Running/reloading the extension**
* Open a project that has Solidity contracts.
* If you did the `set runtimepath` thing correctly, you should see a `coc-solidity works!` message when vim starts.
* You can reload the extension in the test project with `:CocList extensions`, pick the extension, then `TAB`, then `a` for reload.
* A faster way to reload extensions is `:call CocAction('reloadExtension', 'coc-solidity')`

**Seeing logger.info() output**
* Once running, coc's logger creates a file (in my case) `/run/usr/1000/coc-nvim-#.log`.
* Tail it :D
* Watch the extension code and reload it with `:CocList extensions` in the sample project.

**How does vscode.X translate to coc.X?**
* Most of the time it's just a matter of changing vscode => coc.
* Check out coc.nvim and search for the function or object you're trying to port.
* Or see above on how to observe the port process of another extension like coc-spell-checker.
* If you're not sure that port actually produces the same value, debug vscode AND coc and compare values at runtime :pray:

### Docs / help
* [vscode-extensions-docs](https://www.google.com/search?client=firefox-b-d&q=vscode+extension+api)
* [coc-extensions-docs](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions)
* [coc-gitter](https://gitter.im/neoclide/coc.nvim)
