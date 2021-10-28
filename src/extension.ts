import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('fourdiac.start', () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        'fourdiac', // Identifies the type of the webview. Used internally
        '4diac ide', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
          // Enable scripts in the webview
          enableScripts: true,
        }
      );
      const scriptUri = vscode.Uri.file(path.join(context.extensionPath, '4diac', 'graph.js'));
      const scriptSrc = panel.webview.asWebviewUri(scriptUri);
      // And set its HTML content
      panel.webview.html = getWebviewContent(scriptSrc);
    })
  );
}

function getWebviewContent(scriptUri: vscode.Uri) {
  console.log(scriptUri);
  return `<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/gojs/release/go-debug.js"></script>
</head>

<body>
  <div id="myDiagramDiv" style="width:400px; height:150px; background-color: #DAE4E4;"></div>
  <script src="${scriptUri}"></script>
</body>

</html>`;
}