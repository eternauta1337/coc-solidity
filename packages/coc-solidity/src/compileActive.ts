import * as coc from 'coc.nvim'

let diagnosticCollection: coc.DiagnosticCollection;

export function initDiagnosticCollection(diagnostics: coc.DiagnosticCollection) {
  diagnosticCollection = diagnostics;
}
