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
	const completedDateDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.DATE_COMPLETED_LIGHT
        },
        dark: {
            color: StyleConstants.DATE_COMPLETED_DARK
        }
    });
	const createdDateDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.DATE_CREATED_LIGHT
        },
        dark: {
            color: StyleConstants.DATE_CREATED_DARK
        }
    });
	const dueDateDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.DATE_DUE_LIGHT
        },
        dark: {
            color: StyleConstants.DATE_DUE_DARK
        }
    });
	const genericDateDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.DATE_GENERIC_LIGHT
        },
        dark: {
            color: StyleConstants.DATE_GENERIC_DARK
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
    const tagDecorationType = vscode.window.createTextEditorDecorationType({
		light: {
            color: StyleConstants.TAG_LIGHT
        },
        dark: {
            color: StyleConstants.TAG_DARK
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
		if (!(fileName.match(AppConstants.FILENAMES_REGEX) || AppConstants.OTHER_FILENAMES.lastIndexOf(fileName) >= 0)) {
			return;
		}

		const completedDates: vscode.DecorationOptions[] = [];
        const createdDates: vscode.DecorationOptions[] = [];
        const dueDates: vscode.DecorationOptions[] = [];
        const genericDates: vscode.DecorationOptions[] = [];
		const projects: vscode.DecorationOptions[] = [];
		const tags: vscode.DecorationOptions[] = [];
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

            parseRegex(AppConstants.PROJECT_REGEX, projects, lineObject);
            parseRegex(AppConstants.TAG_REGEX, tags, lineObject);
            parseRegex(AppConstants.CONTEXT_REGEX, contexts, lineObject);
            parseRegex(AppConstants.HASHTAG_REGEX, hashtags, lineObject);
            parseRegex(AppConstants.PRICE_REGEX, prices, lineObject);
            parseRegex(AppConstants.PRIORITY_REGEX, priorities, lineObject);

            if (lineObject.text.startsWith("x ", lineObject.firstNonWhitespaceCharacterIndex) || lineObject.text.startsWith("X ", lineObject.firstNonWhitespaceCharacterIndex)) {
                let beginPosition = new vscode.Position(lineObject.range.start.line, lineObject.firstNonWhitespaceCharacterIndex);
                let endPosition = new vscode.Position(lineObject.range.start.line, lineObject.text.length);
                let decoration = { range: new vscode.Range(beginPosition, endPosition) };
                // let decoration = { range: lineObject.range };
                completed.push(decoration);
                
                // TODO: createdDate and dueDate should only be applied if found at start of string;
                //       otherwise, genericDates should be used
                const dates: vscode.DecorationOptions[] = [];
                parseRegex(AppConstants.DATE_REGEX, dates, lineObject);
                let completedDate, createdDate, dueDate;
                if (completedDate = dates.shift()) { completedDates.push(completedDate); }
                if (createdDate = dates.shift()) { createdDates.push(createdDate); }
                if (dueDate = dates.shift()) { dueDates.push(dueDate); }
                genericDates.push(...dates);
            } else {
                // TODO: createdDate and dueDate should only be applied if found at start of string;
                //       otherwise, genericDates should be used
                const dates: vscode.DecorationOptions[] = [];
                parseRegex(AppConstants.DATE_REGEX, dates, lineObject);
                let createdDate, dueDate;
                if (createdDate = dates.shift()) { createdDates.push(createdDate); }
                if (dueDate = dates.shift()) { dueDates.push(dueDate); }
                genericDates.push(...dates);
            }
        }

        activeEditor.setDecorations(completedDateDecorationType, completedDates);
        activeEditor.setDecorations(createdDateDecorationType, createdDates);
        activeEditor.setDecorations(dueDateDecorationType, dueDates);
        activeEditor.setDecorations(genericDateDecorationType, genericDates);

        activeEditor.setDecorations(projectDecorationType, projects);
        activeEditor.setDecorations(tagDecorationType, tags);
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
		let beginPosition = new vscode.Position(inputLine.range.start.line, /*inputLine.firstNonWhitespaceCharacterIndex +*/ match.index);
		let endPosition = new vscode.Position(inputLine.range.start.line, /*inputLine.firstNonWhitespaceCharacterIndex +*/ match.index + match[0].length);
		let decoration = { range: new vscode.Range(beginPosition, endPosition) };
		decorationOptions.push(decoration);
	}
}
