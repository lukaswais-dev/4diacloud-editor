import * as vscode from "vscode";
import { SprottyVscodeExtension, SprottyDiagramIdentifier, SprottyWebview } from "sprotty-vscode";

export class FourdiacloudEditor extends SprottyVscodeExtension {
    constructor(context: vscode.ExtensionContext) {
        // Provide a prefix for registered commands (see further below)
        super('example', context);
    }

    protected getDiagramType(args: any[]): string | undefined {
        if (args.length === 0
            // Check the file extension if the view is created for a source file
            || args[0] instanceof vscode.Uri && args[0].path.endsWith('.example')) {
            // Return a Sprotty diagram type (this info is passed to the Sprotty model source)
            return 'example-diagram';
        }
    }

    createWebView(identifier: SprottyDiagramIdentifier): SprottyWebview {
        return new SprottyWebview({
            extension: this,
            identifier,
            // Root paths from which the webview can load local resources using URIs
            localResourceRoots: [
                this.getExtensionFileUri('pack')
            ],
            // Path to the bundled webview implementation
            scriptUri: this.getExtensionFileUri('pack', 'webview.js'),
            // Change this to `true` to enable a singleton view
            singleton: false
        });
    }
}