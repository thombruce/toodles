# Toodles

![test](https://github.com/thombruce/toodles/actions/workflows/ci.yml/badge.svg?branch=main)

## Testing

```sh
yarn lerna run test:unit
```

## Deploying

_Configure `TOODLES_BASE` to the name of your repo (e.g. `/toodles/`) in your environment if you want to deploy to GitHub Pages from a project repo._

```sh
cd packages/web
yarn build
# Output in packages/web/dist
```
