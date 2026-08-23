'use client'

import { usePathname } from 'next/navigation'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'

function isArticlePath(pathname: string): boolean {
  if (pathname.startsWith('/blog/')) {
    return !pathname.startsWith('/blog/page/') && pathname.length > '/blog/'.length
  }
  if (pathname.startsWith('/snippets/')) {
    let rest = pathname.slice('/snippets/'.length).replace(/\/$/, '')
    return rest.length > 0 && !/^\d+$/.test(rest)
  }
  return false
}

export function ShellBackground() {
  let pathname = usePathname() || '/'
  if (isArticlePath(pathname)) return null
  return <TiltedGridBackground className="inset-x-0 top-0 z-[-1] h-[50vh]" />
}
