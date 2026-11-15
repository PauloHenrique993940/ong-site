import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsCards } from '@/components/Cards'
import { sanityFetch } from '@/sanity/lib/client'
import { NOTICIAS_COUNT_QUERY, NOTICIAS_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = { title: 'Notícias', description: 'Novidades, histórias e resultados do trabalho da ONG.' }
const PAGE_SIZE = 9
type Search = { page?: string; q?: string }
export default async function NoticiasPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)
  const term = params.q?.trim() ?? ''
  const search = term ? `${term}*` : null
  const queryParams = { search, start: (page - 1) * PAGE_SIZE, end: page * PAGE_SIZE }
  const [posts, total] = await Promise.all([
    sanityFetch<Array<{ _id: string; title: string; slug?: { current: string }; excerpt?: string; publishedAt?: string; category?: string; mainImage?: unknown }>>(NOTICIAS_QUERY, queryParams, ['posts']),
    sanityFetch<number>(NOTICIAS_COUNT_QUERY, { search }, ['posts']),
  ])
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  return <><section className="page-hero"><div className="container"><span className="eyebrow">Notícias e histórias</span><h1>O que estamos cultivando por aqui.</h1><p>Acompanhe as novidades, as histórias das comunidades e os resultados de cada iniciativa.</p></div></section><section className="listing-section"><div className="container"><form action="/noticias" className="search-form"><label className="skip-link" htmlFor="q">Buscar notícias</label><input id="q" name="q" placeholder="Buscar notícias..." defaultValue={term} /><button className="button button-small">Buscar <span>↗</span></button></form><NewsCards items={posts} />{total > PAGE_SIZE && <nav className="pager" aria-label="Paginação de notícias">{page > 1 && <Link href={`/noticias?page=${page - 1}&q=${encodeURIComponent(term)}`}>← Anterior</Link>}<span>Página {page} de {pages}</span>{page < pages && <Link href={`/noticias?page=${page + 1}&q=${encodeURIComponent(term)}`}>Próxima →</Link>}</nav>}</div></section></>
}
