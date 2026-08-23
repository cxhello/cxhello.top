import Script from 'next/script.js'

interface UmamiAnalyticsProps {
  websiteId?: string
  src?: string
}

export function UmamiAnalytics({
  websiteId,
  src = 'https://cloud.umami.is/script.js',
}: UmamiAnalyticsProps) {
  // 本地开发不上报统计，避免污染线上数据
  if (websiteId && process.env.NODE_ENV === 'production') {
    return <Script async defer data-website-id={websiteId} src={src} />
  }
  return null
}
