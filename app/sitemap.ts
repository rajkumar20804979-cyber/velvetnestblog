import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(`
    *[_type == "post"]{
      "slug": slug.current,
      _updatedAt
    }
  `)

  const postUrls = posts.map((post: any) => ({
    url: `https://www.thevelvetnest.site/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://www.thevelvetnest.site',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },

    {
      url: 'https://www.thevelvetnest.site/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },

    {
      url: 'https://www.thevelvetnest.site/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    ...postUrls,
  ]
}
