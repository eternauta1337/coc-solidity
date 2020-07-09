import * as coc from 'coc.nvim';
import { errorToDiagnostic } from './solErrorsToDiagnostics';
import { DiagnosticSeverity, Diagnostic } from 'vscode-languageserver';

interface ErrorWarningCounts {
    errors: number;
    warnings: number;
}

export function errorsToDiagnostics(diagnosticCollection: coc.DiagnosticCollection, errors: any): ErrorWarningCounts {
  const errorWarningCounts: ErrorWarningCounts = {errors: 0, warnings: 0};
  const diagnosticMap: Map<coc.Uri, Diagnostic[]> = new Map();

  errors.forEach(error => {
      const {diagnostic, fileName} = errorToDiagnostic(error);

      const targetUri = coc.Uri.file(fileName);
      let diagnostics = diagnosticMap.get(targetUri);

      if (!diagnostics) {
          diagnostics = [];
      }

      diagnostics.push(diagnostic);
      diagnosticMap.set(targetUri, diagnostics);
  });

  const entries: [string, Diagnostic[]][] = [];

  diagnosticMap.forEach((diags, uri) => {
      errorWarningCounts.errors += diags.filter((diagnostic) => diagnostic.severity === DiagnosticSeverity.Error).length;
      errorWarningCounts.warnings += diags.filter((diagnostic) => diagnostic.severity === DiagnosticSeverity.Warning).length;

      entries.push([uri.fsPath, diags]);
  });

  diagnosticCollection.set(entries);

  return errorWarningCounts;
}
