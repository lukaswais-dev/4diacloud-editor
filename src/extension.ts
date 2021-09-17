// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "4diacloud-editor" is now active!');

	context.subscriptions.push(
		vscode.commands.registerCommand('4diacloud-editor.start', () => {
		  // Create and show a new webview
		  const panel = vscode.window.createWebviewPanel(
			'4diacloud', // Identifies the type of the webview. Used internally
			'4diacloud Editor', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		  );
		  // set the HTML content
		  panel.webview.html = getWebviewContent();
		})
	  );
}

function getWebviewContent() {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none';">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>4diacloud Editor</title>
  </head>
  <body>
  <h1>Hello Webview</h1>
   </body>
  </html>`;
}

// this method is called when your extension is deactivated
// export function deactivate() {}
