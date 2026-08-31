import { allBlogs } from 'contentlayer/generated'
import { SITE_METADATA } from '~/data/site-metadata'

export function GET() {
  let posts = allBlogs.filter((p) => !p.draft).sort((a, b) => (a.date < b.date ? 1 : -1))
  let lines = [
    `# ${SITE_METADATA.title}`,
    `> ${SITE_METADATA.description}`,
    '',
    '## Blog posts',
    ...posts.map(
      (p) => `- [${p.title}](${SITE_METADATA.siteUrl}/raw/blog/${p.slug}): ${p.summary ?? ''}`
    ),
  ]
  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  })
}
