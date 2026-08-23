import type { Blog } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { ArticleEndAd } from '~/components/blog/article-end-ad'
import { BlogMeta } from '~/components/blog/blog-meta'
import { Comments } from '~/components/blog/comments'
import { DiscussOnX } from '~/components/blog/discuss-on-x'
import { EditOnGithub } from '~/components/blog/edit-on-github'
import { HeroImage } from '~/components/blog/hero-image'
import { PostNav } from '~/components/blog/post-nav'
import { PostTitle } from '~/components/blog/post-title'
import { ScrollButtons } from '~/components/blog/scroll-buttons'
import { SocialShare } from '~/components/blog/social-share'
import { TagsList } from '~/components/blog/tags'
import { SITE_METADATA } from '~/data/site-metadata'
import type { StatsType } from '~/db/schema'
import type { CoreContent } from '~/types/data'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export function PostBanner({ content, next, prev, children }: LayoutProps) {
  let { slug, type, title, images, date, lastmod, readingTime, tags, filePath } = content
  let postUrl = `${SITE_METADATA.siteUrl}/${type.toLowerCase()}/${slug}`

  return (
    <div className="relative isolate">
      <HeroImage src={images?.[0] || SITE_METADATA.socialBanner} />
      <ScrollButtons />
      <article className="mx-auto w-full max-w-[59.375rem] space-y-6 px-[clamp(1rem,4vw,3rem)] pt-[clamp(96px,22vh,260px)] lg:space-y-16">
        <div className="space-y-4">
          <TagsList tags={tags} />
          <PostTitle>{title}</PostTitle>
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
              <BlogMeta
                date={date}
                lastmod={lastmod}
                type={type.toLowerCase() as StatsType}
                slug={slug}
                readingTime={readingTime}
              />
            </div>
          </dl>
        </div>
        <div className="prose max-w-none dark:prose-invert">{children}</div>
        <div className="space-y-8 border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-2">
              <DiscussOnX postUrl={postUrl} />
              <span className="text-gray-500">/</span>
              <EditOnGithub filePath={filePath} />
            </div>
            {/* <SocialShare postUrl={postUrl} title={title} /> */}
          </div>
          <PostNav next={next} nextLabel="Next post" prev={prev} prevLabel="Previous post" />
          <ArticleEndAd />
          <Comments />
        </div>
      </article>
    </div>
  )
}
