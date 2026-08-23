import assert from 'node:assert'
import { remark } from 'remark'
import { remarkPanguSpacing } from './remark-pangu-spacing'

let out = String(
  remark().use(remarkPanguSpacing).processSync('中文English和123数字，行内`代码code`不动')
)
assert.match(out, /中文 English 和 123 数字/)
assert.match(out, /`代码code`/)
assert.doesNotMatch(out, /中文  English/) // 幂等：已有空格不重复加

console.log('remark-pangu-spacing: all assertions passed')
