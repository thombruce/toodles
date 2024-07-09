# Change Log

All notable changes to the "toodles" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Added

- Support for use of hyphen (`-`) at the beginning of line for alignment with focus, done and obsolete tasks

### Fixes

- Regexes: Check only for whitespace padding at beginning of line (before focus character), instead of all non-word characters

## [0.0.7] - 2024-06-08

### Fixes

- Certain RegExes now only match when followed by a space or zero-length boundary, fixing some false positives

## [0.0.6] - 2024-06-07

### Added

- Multiplier highlighting for shopping list items

### Changed

- Improved price/currency matching; decimal prices can now be separated by comma

### Fixes

- No longer match prices/currencies that are just a symbol; some numeric value must be present

## [0.0.5] - 2024-06-07

### Added

- Focus and obsolete status for list items; these can be marked by a `!` or `~` at the start of the line

## [0.0.4] - 2024-06-07

### Added

- Additional date colors to differentiate between created date, due date and completed date

### Changed

- Improved regex to identify priority (e.g. `(A)`) only near start of string

## [0.0.3] - 2024-06-06

- Initial release

[unreleased]: https://github.com/thombruce/toodles/compare/v0.0.7...HEAD
[0.0.7]: https://github.com/thombruce/toodles/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/thombruce/toodles/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/thombruce/toodles/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/thombruce/toodles/compare/2cd5b0b2f62a2887e92404590ffc100642a0b91c...v0.0.4
[0.0.3]: https://github.com/thombruce/toodles/tree/2cd5b0b2f62a2887e92404590ffc100642a0b91c/packages/vscode
