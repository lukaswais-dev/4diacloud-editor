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
	// return `
	// <svg height="210" width="500">
  	// 	<polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;"/>
  	// 	Sorry, your browser does not support inline SVG.
	// </svg>
	// `;

	let name:string = "Hello from a TS Variable"; 
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
	<h1>Hello ${name}</h1>
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
        }, 100);
    </script>
</body>
</html>
	`;
}

// this method is called when your extension is deactivated
// export function deactivate() {}
