'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

const SLOT = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_END_SLOT

export function ArticleEndAd() {
  useEffect(() => {
    if (!SLOT) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // adsbygoogle 未加载（如广告拦截器）时静默失败
    }
  }, [])
  if (!SLOT) return null
  return (
    <ins
      className="adsbygoogle block"
      data-ad-client="ca-pub-7494326995438759"
      data-ad-slot={SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
