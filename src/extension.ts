import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('4diac.start', () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        '4diac', // Identifies the type of the webview. Used internally
        '4diac ide', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
      );
    })
  );
}