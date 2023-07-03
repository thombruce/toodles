# Toodles

![CI](https://github.com/thombruce/toodles/actions/workflows/ci.yml/badge.svg?branch=main)
![Version](https://img.shields.io/github/v/tag/thombruce/toodles?label=release)
![License](https://img.shields.io/github/license/thombruce/toodles)

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
