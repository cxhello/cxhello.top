import type { Author, Blog } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { ArticleEndAd } from '~/components/blog/article-end-ad'
import { BlogMeta } from '~/components/blog/blog-meta'
import { Comments } from '~/components/blog/comments'
import { CopyMarkdownButton } from '~/components/blog/copy-markdown-button'
import { HeroImage } from '~/components/blog/hero-image'
import { PostNav } from '~/components/blog/post-nav'
import { PostTitle } from '~/components/blog/post-title'
import { Reactions } from '~/components/blog/reactions'
import { ScrollButtons } from '~/components/blog/scroll-buttons'
import { SocialShare } from '~/components/blog/social-share'
import { TagsList } from '~/components/blog/tags'
import { TableOfContents } from '~/components/blog/toc'
import { GradientDivider } from '~/components/ui/gradient-divider'
import { SITE_METADATA } from '~/data/site-metadata'
import type { StatsType } from '~/db/schema'
import type { CoreContent } from '~/types/data'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Author>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export function PostLayout({ content, next, prev, children }: LayoutProps) {
  let { slug, images, lastmod, readingTime, date, filePath, title, tags, toc, type } = content
  let postUrl = `${SITE_METADATA.siteUrl}/${type.toLowerCase()}/${slug}`

  return (
    <div className="relative isolate">
      <HeroImage src={images?.[0] || SITE_METADATA.socialBanner} />
      <ScrollButtons />
      <div className="mx-auto flex w-full gap-10 px-[clamp(1rem,4vw,3rem)] pt-4 lg:pt-12">
        <div className="min-w-0 flex-1">
          <article className="mx-auto w-full max-w-[59.375rem] pt-[clamp(96px,22vh,260px)]">
            <div className="space-y-4">
              <TagsList tags={tags} />
              <PostTitle>{title}</PostTitle>
              <div className="flex items-center justify-between gap-2 pb-4 lg:pt-2">
                <BlogMeta
                  date={date}
                  lastmod={lastmod}
                  type={type.toLowerCase() as StatsType}
                  slug={slug}
                  readingTime={readingTime}
                />
                <div className="flex items-center gap-4">
                  <SocialShare
                    postUrl={postUrl}
                    filePath={filePath}
                    title={title}
                    className="hidden md:flex"
                  />
                  <CopyMarkdownButton type={type.toLowerCase()} slug={slug} />
                </div>
              </div>
            </div>
            <GradientDivider className="mb-2 mt-1" />
            <div className="prose max-w-none py-8 dark:prose-invert lg:pb-10">{children}</div>
            <GradientDivider />
            <div className="space-y-4">
              <PostNav next={next} nextLabel="Next post" prev={prev} prevLabel="Previous post" />
              <ArticleEndAd />
              <Comments configs={{ reactions: '0' }} />
            </div>
          </article>
        </div>
        <aside className="hidden w-[18.125rem] shrink-0 pt-[clamp(96px,22vh,260px)] xl:block">
          <div className="sticky top-24 space-y-4 divide-y divide-gray-200 dark:divide-gray-700">
            <TableOfContents toc={toc} />
            <Reactions className="pt-6" type={type.toLowerCase() as StatsType} slug={slug} />
          </div>
        </aside>
      </div>
    </div>
  )
}
