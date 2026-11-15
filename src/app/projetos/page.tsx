import type { Metadata } from 'next'
import { ProjectCards } from '@/components/Cards'
import { sanityFetch } from '@/sanity/lib/client'
import { PROJETOS_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = { title: 'Projetos', description: 'Conheça as iniciativas construídas junto às comunidades.' }
export default async function ProjetosPage() {
  const projects = await sanityFetch<Array<{ _id: string; title: string; slug?: { current: string }; summary?: string; status?: string; location?: string; coverImage?: unknown }>>(PROJETOS_QUERY, {}, ['projetos'])
  return <><section className="page-hero"><div className="container"><span className="eyebrow">O que fazemos</span><h1>Iniciativas que crescem com as comunidades.</h1><p>Cada projeto nasce da escuta e ganha força com a participação de quem transforma a própria realidade todos os dias.</p></div></section><section className="listing-section"><div className="container"><ProjectCards items={projects} /></div></section></>
}
