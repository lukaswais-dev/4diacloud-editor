// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
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
				{
					// Enable scripts in the webview
					enableScripts: true,
					localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, '../src/editor/'))] // only files of inside the editor directory are loaded
				} // Webview options. More on these later.
			);
			const htmlOnDiskPath = vscode.Uri.file(path.join(context.extensionPath, '../src/editor/', 'diagram.html'));
			const htmlOnDisk = panel.webview.asWebviewUri(htmlOnDiskPath);

			

			// set the HTML content
			panel.webview.html = getWebviewContent(htmlOnDisk);
		})
	);
}

function getWebviewContent(htmlOnDisk: vscode.Uri) {
	let name: string = "Hello from a TS Variable";
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
			<svg width="400" height="100">
				<rect width="400" height="100" style="fill:rgb(0,0,255);stroke-width:10;stroke:rgb(0,0,0)" />
			</svg>

			<svg height="130" width="500">
				<defs>
					<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
					<stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
					</linearGradient>
				</defs>
				<ellipse cx="100" cy="70" rx="85" ry="55" fill="url(#grad1)" />
				<text fill="#ffffff" font-size="45" font-family="Verdana" x="50" y="86">SVG</text>
			</svg>
			<a href="${htmlOnDisk}"> abc </a>
		</body>
	</html>`;
}

// this method is called when your extension is deactivated
// export function deactivate() {}
