import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/],
      },
      setupFiles: [
        'fake-indexeddb/auto'
      ],
      coverage: {
        statements: 60,
        functions: 60,
        branches: 60,
        lines: 60,
        reporter: [
          'text', 'html', 'clover', 'json', 'json-summary'
        ]
      }
    }
  })
)
