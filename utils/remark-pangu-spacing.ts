// `mdast` 类型包未在 pnpm 虚拟存储中被提升到本文件可解析的位置（仅 remark 内部依赖树可见），
// 故退回到仓库既有约定（其他 utils/remark-*.ts 同样直接使用 unist 的 Parent）的结构化类型。
import type { Literal, Parent as Root } from 'unist'
import { visit } from 'unist-util-visit'

const CJK = '\\u2e80-\\u2eff\\u3400-\\u4dbf\\u4e00-\\u9fff\\uf900-\\ufaff'
const CJK_THEN_LATIN = new RegExp(`([${CJK}])([A-Za-z0-9])`, 'g')
const LATIN_THEN_CJK = new RegExp(`([A-Za-z0-9])([${CJK}])`, 'g')

// mdast 的 text 节点不包含 code/inlineCode（它们是独立节点类型），代码天然豁免
export function remarkPanguSpacing() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Literal) => {
      if (typeof node.value !== 'string') return
      node.value = node.value.replace(CJK_THEN_LATIN, '$1 $2').replace(LATIN_THEN_CJK, '$1 $2')
    })
  }
}
