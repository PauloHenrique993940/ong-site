import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { SITEMAP_QUERY } from '@/sanity/lib/queries'
import { getSiteUrl } from '@/lib/siteUrl'

export const revalidate = 3600

type Entry = { _type: 'post' | 'projeto'; slug: string; _updatedAt?: string }
const staticRoutes = ['', '/sobre', '/projetos', '/noticias', '/transparencia', '/doe']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().origin
  const entries = await sanityFetch<Entry[]>(SITEMAP_QUERY, {}, ['posts', 'projetos'])
  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}`, changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : 0.6 })),
    ...entries.map((item) => ({ url: `${base}/${item._type === 'post' ? 'noticias' : 'projetos'}/${item.slug}`, lastModified: item._updatedAt ? new Date(item._updatedAt) : undefined, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
