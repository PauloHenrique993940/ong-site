import Image from 'next/image'
import Link from 'next/link'
import { imageUrl } from '@/sanity/lib/image'

type NewsItem = { _id: string; title: string; slug?: { current: string }; excerpt?: string; publishedAt?: string; category?: string; mainImage?: unknown }
type ProjectItem = { _id: string; title: string; slug?: { current: string }; summary?: string; status?: string; location?: string; coverImage?: unknown }

export function NewsCards({ items }: { items: NewsItem[] }) {
  if (!items.length) return <div className="empty-state">As próximas notícias serão publicadas aqui. A equipe pode adicionar conteúdos pelo Studio.</div>
  return <div className="card-grid">{items.map((item) => {
    const src = imageUrl(item.mainImage)
    return <article className="news-card" key={item._id}><Link href={`/noticias/${item.slug?.current ?? ''}`}>
      <div className="card-image">{src && <Image src={src} alt={(item.mainImage as { alt?: string })?.alt ?? ''} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" />}{item.category && <span className="tag">{item.category}</span>}</div>
      <div className="card-copy"><span className="news-date">{item.publishedAt ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(item.publishedAt)) : 'Notícia'}</span><h3>{item.title}</h3><p>{item.excerpt}</p><span className="text-link">Ler notícia <span>↗</span></span></div>
    </Link></article>
  })}</div>
}

export function ProjectCards({ items }: { items: ProjectItem[] }) {
  if (!items.length) return <div className="empty-state">Os projetos serão apresentados aqui assim que a equipe publicar os primeiros conteúdos no Studio.</div>
  return <div className="card-grid">{items.map((item) => {
    const src = imageUrl(item.coverImage)
    return <article className="project-card" key={item._id}><div className="card-image">{src && <Image src={src} alt={(item.coverImage as { alt?: string })?.alt ?? ''} fill sizes="(max-width: 600px) 100vw, 33vw" />}<span className="tag">{item.status ?? 'Projeto'}</span></div><div className="card-copy"><span className="card-meta">{item.location ?? 'Atuação comunitária'}</span><h3>{item.title}</h3><p>{item.summary}</p></div></article>
  })}</div>
}
