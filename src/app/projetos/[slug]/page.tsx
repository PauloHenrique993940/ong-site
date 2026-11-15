import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { imageUrl } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/client'
import { PROJETO_QUERY } from '@/sanity/lib/queries'

type Project = { title: string; summary?: string; status?: string; location?: string; startDate?: string; endDate?: string; impact?: string[]; coverImage?: unknown; body?: never[] }
async function getProject(slug: string) { return sanityFetch<Project | null>(PROJETO_QUERY, { slug }, ['projetos'], null) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  const cover = project ? imageUrl(project.coverImage) : ''
  return project ? { title: project.title, description: project.summary, openGraph: { title: project.title, description: project.summary, images: cover ? [cover] : [] } } : { title: 'Projeto não encontrado' }
}

export default async function ProjetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()
  const cover = imageUrl(project.coverImage)
  return <article><header className="article-hero"><div className="container"><span className="eyebrow">{project.status ?? 'Projeto'}{project.location ? ` · ${project.location}` : ''}</span><h1>{project.title}</h1><p className="muted">{project.summary}</p>{cover && <div style={{ position: 'relative', height: 'min(52vw, 500px)', marginTop: 30 }}><Image className="article-cover" src={cover} alt={(project.coverImage as { alt?: string })?.alt ?? ''} fill priority sizes="100vw" /></div>}</div></header><div className="article-body">{project.impact && project.impact.length > 0 && <section><h2>Resultados e indicadores</h2><ul>{project.impact.map((item) => <li key={item}>{item}</li>)}</ul></section>}{project.body && <PortableText value={project.body as never} />}<Link className="text-link" href="/projetos">← Voltar aos projetos</Link></div></article>
}
