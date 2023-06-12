import lunr from 'lunr'

const index = lunr(() => {}) as any

lunr.tokenizer.separator = /[\s\-]+/

const getTokenStream = (text: string) =>
  index.pipeline.run(
    lunr.tokenizer(text)
  )

export const tokenize = (text: string) => getTokenStream(text).map(({ str }: { str: string }) => str)
