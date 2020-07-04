import * as coc from 'coc.nvim'

export class Compiler {
  private solcCachePath: string;
  private outputChannel: coc.OutputChannel;

  constructor(solcCachePath: string) {
    this.solcCachePath = solcCachePath;
    this.outputChannel = coc.workspace.createOutputChannel('solidity compilation');
  }
}
