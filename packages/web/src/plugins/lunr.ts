import lunr from 'lunr'

import { default as _uniq } from 'lodash/uniq'

const index = lunr(() => {}) as any

lunr.tokenizer.separator = /\W+/

const getTokenStream = (text: string) =>
  index.pipeline.run(
    lunr.tokenizer(text)
  )

export const tokenize = (text: string) => _uniq(getTokenStream(text).map(({ str }: { str: string }) => str)) as string[]
