const CJK_RE = /[⺀-⻿　-〿㐀-䶿一-鿿豈-﫿]/g

export type ReadingStats = {
  cjkChars: number
  latinWords: number
  minutes: number
  isCJK: boolean
}

// 中文 ~500 字/分钟，英文 ~200 词/分钟；围栏代码块与行内 code 不计入
const CJK_CHARS_PER_MINUTE = 500
const LATIN_WORDS_PER_MINUTE = 200

export function readingStats(text: string): ReadingStats {
  let stripped = text.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`\n]*`/g, ' ')
  let cjkChars = (stripped.match(CJK_RE) || []).length
  let latinWords = (stripped.replace(CJK_RE, ' ').match(/[A-Za-z0-9][A-Za-z0-9'-]*/g) || []).length
  let minutes = Math.max(
    1,
    Math.round(cjkChars / CJK_CHARS_PER_MINUTE + latinWords / LATIN_WORDS_PER_MINUTE)
  )
  return { cjkChars, latinWords, minutes, isCJK: cjkChars > latinWords }
}
