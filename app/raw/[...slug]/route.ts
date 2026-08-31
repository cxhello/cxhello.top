import { allBlogs, allSnippets } from 'contentlayer/generated'

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  let { slug } = await ctx.params
  let [type, ...rest] = slug
  let path = decodeURI(rest.join('/'))
  let docs =
    type === 'blog' ? allBlogs : type === 'snippets' || type === 'snippet' ? allSnippets : []
  let doc = docs.find((d) => d.slug === path && !d.draft)
  if (!doc) return new Response('Not found', { status: 404 })
  let md = `# ${doc.title}\n\n> ${doc.summary ?? ''}\n\n${doc.body.raw}`
  return new Response(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  })
}
