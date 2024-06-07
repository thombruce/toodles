# Toodles

[![CI](https://github.com/thombruce/toodles/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/thombruce/toodles/actions/workflows/ci.yml?query=branch%3Amain)
[![Version](https://img.shields.io/github/v/tag/thombruce/toodles?label=release)](https://github.com/thombruce/toodles/tags)
[![License](https://img.shields.io/github/license/thombruce/toodles)](https://github.com/thombruce/toodles/blob/main/COPYING)

## Testing

```sh
yarn lerna run test:unit
```

## Deploying

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/thombruce/toodles&base=packages/web)

### Deploying Manually

_Configure `TOODLES_BASE` to the name of your repo (e.g. `/toodles/`) in your environment if you want to deploy to GitHub Pages from a project repo._

```sh
cd packages/web
yarn build
# Output in packages/web/dist
```

## Development

### General

```sh
# Update CHANGELOG and README and commit where relevant, then...
lerna publish
```

### VS Code

```sh
cd packages/vscode
vsce package
vsce publish
```
