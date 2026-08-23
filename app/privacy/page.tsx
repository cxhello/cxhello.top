import { genPageMetadata } from '~/app/seo'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { SITE_METADATA } from '~/data/site-metadata'

export let metadata = genPageMetadata({ title: 'Privacy Policy' })

export default function PrivacyPage() {
  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="Privacy Policy"
        description={<p>本站如何处理访问数据的说明（最后更新：2026-08-23）。</p>}
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="prose max-w-none py-8 dark:prose-invert">
        <p>
          本站（{SITE_METADATA.siteUrl}
          ）是一个个人博客。我不要求注册账号，不设置任何表单收集你的个人信息。
          以下是本站涉及数据处理的全部内容：
        </p>
        <h2>访问统计</h2>
        <p>
          本站使用 <a href="https://umami.is">Umami</a>{' '}
          进行匿名访问统计（页面浏览量、来源、设备类型）。Umami 不使用
          cookies，不收集可识别个人身份的信息， 统计数据仅用于了解内容受欢迎程度。你可以在{' '}
          <a href={SITE_METADATA.analytics.umamiAnalytics.shareUrl}>公开的统计面板</a>
          查看与我看到的完全相同的数据。
        </p>
        <h2>评论</h2>
        <p>
          文章评论由 <a href="https://giscus.app">giscus</a> 提供，基于 GitHub Discussions。
          发表评论需要登录你的 GitHub 账号，评论内容公开存储于本站的 GitHub 仓库 Discussions 中， 受{' '}
          <a href="https://docs.github.com/site-policy/privacy-policies/github-privacy-statement">
            GitHub 隐私政策
          </a>
          约束。
        </p>
        <h2>广告</h2>
        <p>
          本站文章页可能展示 Google AdSense 提供的广告。Google 及其合作伙伴可能使用 cookies
          根据你对本站及其他网站的访问记录展示个性化广告。你可以在{' '}
          <a href="https://www.google.com/settings/ads">Google 广告设置</a>中停用个性化广告， 或访问{' '}
          <a href="https://www.aboutads.info">www.aboutads.info</a> 了解更多。 详见{' '}
          <a href="https://policies.google.com/technologies/partner-sites">
            Google 如何使用来自合作伙伴网站的信息
          </a>
          。
        </p>
        <h2>托管与日志</h2>
        <p>
          本站托管于 <a href="https://vercel.com">Vercel</a>
          ，其基础设施可能记录标准的服务器访问日志（IP 地址、User-Agent 等）用于安全与运维，受{' '}
          <a href="https://vercel.com/legal/privacy-policy">Vercel 隐私政策</a>约束。
        </p>
        <h2>第三方内容</h2>
        <p>
          侧边栏的 Spotify「正在播放」组件仅展示我本人的收听数据，不读取访问者的任何信息。
          文章中嵌入的第三方内容（如 YouTube 视频）在加载时受各自平台的隐私政策约束。
        </p>
        <h2>联系</h2>
        <p>
          对本政策有任何疑问，可通过邮件联系我：
          <a href={`mailto:${SITE_METADATA.email}`}>{SITE_METADATA.email}</a>。
        </p>
      </div>
    </Container>
  )
}
