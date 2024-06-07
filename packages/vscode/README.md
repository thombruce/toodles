# Toodles VS Code README

Adds syntax highlighting for `.todo`, `.shop` and `.list` documents based on an extension of the `todo.txt` spec.

## Features

- `todo.txt` and `done.txt` syntax highlighting
- Extended support for documents with custom extensions: `.todo`, `.shop`, `.list`
- Highlighting for todo lists, shopping lists and general checklists
- Priorities, contexts, projects and tags based on the `todo.txt` spec
- Additional support for hashtags and a (currently limited) range of prices (for shopping lists)
- Experimental support for subtasks/nested todos

## Known Issues

None. Let me know if you identify any.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.3

Initial release of Toodles VS Code

### 0.0.4

- Additional date colors to differentiate between created date, due date and completed date
- Improved regex to identify priority (e.g. `(A)`) only near start of string

### 0.0.5

- Added focus and obsolete status for list items; these can be marked by a `!` or `~` at the start of the line

### 0.0.6

- Added multiplier highlighting for shopping list items
