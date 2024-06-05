// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as path from 'path';

import AppConstants from './utils/AppConstants';
import StyleConstants from './utils/StyleConstants';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let timeout: NodeJS.Timeout | undefined = undefined;

	// Decoration Types
	const dateDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.DATE_LIGHT
        },
        dark: {
            color: StyleConstants.DATE_DARK
        }
    });
    const projectDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.PROJECT_LIGHT
        },
        dark: {
            color: StyleConstants.PROJECT_DARK
        }
    });
    const priorityDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.PRIORITY_LIGHT
        },
        dark: {
            color: StyleConstants.PRIORITY_DARK
        }
    });
    // const overdueDecorationType = vscode.window.createTextEditorDecorationType({});
    const contextDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.CONTEXT_LIGHT
        },
        dark: {
            color: StyleConstants.CONTEXT_DARK
        }
    });
    const hashtagDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.HASHTAG_LIGHT
        },
        dark: {
            color: StyleConstants.HASHTAG_DARK
        }
    });
    const priceDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.PRICE_LIGHT
        },
        dark: {
            color: StyleConstants.PRICE_DARK
        }
    });
    const completedDecorationType = vscode.window.createTextEditorDecorationType({
        textDecoration: StyleConstants.COMPLETED_CSS
    });

	let activeEditor = vscode.window.activeTextEditor;

	function updateDecorations() {
		if (!activeEditor) {
			return;
		}

		let fileName = path.basename(activeEditor.document.fileName);
		if (!(AppConstants.ACCEPTED_FILENAMES.lastIndexOf(fileName) >= 0 || fileName.match(AppConstants.FILENAMES_REGEX))) {
			return;
		}

		const dates: vscode.DecorationOptions[] = [];
		const projects: vscode.DecorationOptions[] = [];
		const priorities: vscode.DecorationOptions[] = [];
		// const overdue: vscode.DecorationOptions[] = [];
		const completed: vscode.DecorationOptions[] = [];
		const contexts: vscode.DecorationOptions[] = [];
		const hashtags: vscode.DecorationOptions[] = [];
		const prices: vscode.DecorationOptions[] = [];

        // Iterate over each line and parse accordingly
        let totalLines = activeEditor.document.lineCount;
        for (var i = 0; i <= totalLines - 1; i++) {
            let lineObject = activeEditor.document.lineAt(i);

            parseRegex(AppConstants.DATE_REGEX, dates, lineObject);
            parseRegex(AppConstants.PROJECT_REGEX, projects, lineObject);
            parseRegex(AppConstants.CONTEXT_REGEX, contexts, lineObject);
            parseRegex(AppConstants.HASHTAG_REGEX, hashtags, lineObject);
            parseRegex(AppConstants.PRICE_REGEX, prices, lineObject);
            parseRegex(AppConstants.PRIORITY_REGEX, priorities, lineObject);

            if (lineObject.text.startsWith("x ") || lineObject.text.startsWith("X ")) {
                let decoration = { range: lineObject.range};
                completed.push(decoration);
            }
        }

		activeEditor.setDecorations(dateDecorationType, dates);
        activeEditor.setDecorations(projectDecorationType, projects);
        activeEditor.setDecorations(contextDecorationType, contexts);
        activeEditor.setDecorations(hashtagDecorationType, hashtags);
        activeEditor.setDecorations(priceDecorationType, prices);
        activeEditor.setDecorations(completedDecorationType, completed);
		// activeEditor.setDecorations(overdueDecorationType, overdue);
        activeEditor.setDecorations(priorityDecorationType, priorities);
	}

	function triggerUpdateDecorations(throttle = false) {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		if (throttle) {
			timeout = setTimeout(updateDecorations, 500);
		} else {
			updateDecorations();
		}
	}

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;
		if (editor) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			triggerUpdateDecorations(true);
		}
	}, null, context.subscriptions);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function parseRegex(iRegExp: RegExp, decorationOptions: vscode.DecorationOptions[], inputLine: vscode.TextLine) {
	let match: RegExpExecArray;
	while (match = iRegExp.exec(inputLine.text)) {
		let beginPosition = new vscode.Position(inputLine.range.start.line, inputLine.firstNonWhitespaceCharacterIndex + match.index);
		let endPosition = new vscode.Position(inputLine.range.start.line, inputLine.firstNonWhitespaceCharacterIndex + match.index + match[0].length);
		let decoration = { range: new vscode.Range(beginPosition, endPosition) };
		decorationOptions.push(decoration);
	}
}
