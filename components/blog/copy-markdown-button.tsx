'use client'

import { useState } from 'react'

export function CopyMarkdownButton({ type, slug }: { type: string; slug: string }) {
  let [copied, setCopied] = useState(false)

  async function copy() {
    let res = await fetch(`/raw/${type}/${slug}`)
    if (!res.ok) return
    await navigator.clipboard.writeText(await res.text())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    >
      {copied ? 'Copied ✓' : 'Copy as Markdown'}
    </button>
  )
}
