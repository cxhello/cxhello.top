import assert from 'node:assert'
import { readingStats } from './reading-stats'

let zh = '汉'.repeat(5000) + ' hello world'
let s = readingStats(zh)
assert.equal(s.cjkChars, 5000)
assert.equal(s.isCJK, true)
assert.equal(s.minutes, 10) // 5000/500 + 2/200 ≈ 10

let en = Array(400).fill('word').join(' ')
let e = readingStats(en)
assert.equal(e.isCJK, false)
assert.equal(e.minutes, 2) // 400/200

let fenced = '汉'.repeat(1000) + '\n```js\nconst a = 1\n```\n'
assert.equal(readingStats(fenced).cjkChars, 1000) // 代码块不计入

assert.equal(readingStats('短').minutes, 1) // 下限 1 分钟

console.log('reading-stats: all assertions passed')
