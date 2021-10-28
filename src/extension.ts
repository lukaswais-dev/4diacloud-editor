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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.20.0/cytoscape.min.js" integrity="sha512-cjmYAonfXK+azDmWqvnqq8xmygHRHqVI7S0zuRxQnvcYVeoakwthRX6pPKoXfG1oIjDvMUtteRV9PhQjJwKWxQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>

<style>
    #cy {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }
</style>

<body>
<div id="cy"></div>
<script src="${scriptUri}"></script>
</body>

</html>`;
}