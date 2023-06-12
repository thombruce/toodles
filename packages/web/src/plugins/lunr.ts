import lunr from 'lunr'

import { uniq as _uniq } from 'lodash'

const index = lunr(() => {}) as any

lunr.tokenizer.separator = /[+@:\s\-]+/

const getTokenStream = (text: string) =>
  index.pipeline.run(
    lunr.tokenizer(text)
  )

export const tokenize = (text: string) => _uniq(getTokenStream(text).map(({ str }: { str: string }) => str))
