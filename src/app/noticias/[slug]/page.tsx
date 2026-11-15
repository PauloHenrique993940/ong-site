import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { imageUrl } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/client'
import { NOTICIA_QUERY } from '@/sanity/lib/queries'

type Post = { title: string; excerpt?: string; publishedAt?: string; category?: string; mainImage?: unknown; body?: never[] }
async function getPost(slug: string) { return sanityFetch<Post | null>(NOTICIA_QUERY, { slug }, ['posts'], null) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return post ? { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, images: imageUrl(post.mainImage) ? [imageUrl(post.mainImage)] : [] } } : { title: 'Notícia não encontrada' }
}
export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const cover = imageUrl(post.mainImage)
  return <article><header className="article-hero"><div className="container"><span className="eyebrow">{post.category ?? 'Notícia'}{post.publishedAt ? ` · ${new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(post.publishedAt))}` : ''}</span><h1>{post.title}</h1><p className="muted">{post.excerpt}</p>{cover && <div style={{ position: 'relative', height: 'min(52vw, 500px)', marginTop: 30 }}><Image className="article-cover" src={cover} alt={(post.mainImage as { alt?: string })?.alt ?? ''} fill priority sizes="100vw" /></div>}</div></header><div className="article-body">{post.body && <PortableText value={post.body as never} />}</div></article>
}
