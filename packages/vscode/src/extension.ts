// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import ToodlesDecorator from './decorators/ToodlesDecorator';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let toodlesDecorator = new ToodlesDecorator();

  // By Default Decorate the document
  toodlesDecorator.decorateDocument();
}

// This method is called when your extension is deactivated
export function deactivate() {}


// TODO: This isn't working, and I know why!
// Compare to: https://github.com/microsoft/vscode-extension-samples/blob/main/decorator-sample/src/extension.ts
// Notice the use of onDidChange______ events
//
// The work I've been basing this on so far, I think, must use an older version of the VSCode API.
// Makes sense; it was last touched 7 years ago.
// I just need to make modifications such that my baseline is the linked example above...
// ...and add my specific work on top of that.
// This should fix the problem of...
// - It currently only works when FIRST document is FIRST opened
// - Fails for second document and beyond
