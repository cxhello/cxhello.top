import Script from 'next/script'

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7494326995438759"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      {children}
    </>
  )
}
