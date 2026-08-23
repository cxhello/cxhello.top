'use client'

import { usePathname } from 'next/navigation'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'

const ARTICLE_PREFIXES = ['/blog/', '/snippets/']

export function ShellBackground() {
  let pathname = usePathname() || '/'
  let isArticle = ARTICLE_PREFIXES.some((p) => pathname.startsWith(p) && pathname.length > p.length)
  if (isArticle) return null
  return <TiltedGridBackground className="inset-x-0 top-0 z-[-1] h-[50vh]" />
}
