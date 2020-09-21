import { truncate } from 'fs';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let currentPanel: vscode.WebviewPanel | undefined = undefined;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "mcf-gui" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	context.subscriptions.push(vscode.commands.registerCommand('mcf-gui.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from mcf-gui!');
	}));

	context.subscriptions.push(
		vscode.commands.registerCommand('mcf-gui.generator', () => {
			const columnToShowIn = vscode.window.activeTextEditor
				? vscode.window.activeTextEditor.viewColumn
				: undefined;

			if (currentPanel) {
				// If we already have a panel, show it in the target column
				currentPanel.reveal(columnToShowIn);
			} else {
				// Otherwise, create a new panel
				currentPanel = vscode.window.createWebviewPanel(
					'@mcfed/generator',
					'Generator Config',
					//@ts-ignore
					columnToShowIn,
					{}
				);
				currentPanel.webview.html = getWebviewContent();

				// Reset when the current panel is closed
				currentPanel.onDidDispose(
					() => {
						currentPanel = undefined;
					},
					null,
					context.subscriptions
				);
			}
		})
	);
}

function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  webview 11112
  </body>
  </html>`;
}

// this method is called when your extension is deactivated
export function deactivate() { }
