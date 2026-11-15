import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { RELATORIOS_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = { title: 'Transparência', description: 'Acesse relatórios e documentos de prestação de contas.' }
type Report = { _id: string; title: string; period?: string; publishedAt?: string; file?: { asset?: { url?: string; originalFilename?: string } } }
export default async function TransparenciaPage() {
  const reports = await sanityFetch<Report[]>(RELATORIOS_QUERY, {}, ['transparencia'])
  return <><section className="page-hero"><div className="container"><span className="eyebrow">Transparência</span><h1>Confiança também se constrói com clareza.</h1><p>Disponibilizamos nossos relatórios e documentos para que você acompanhe como os recursos apoiam o trabalho nas comunidades.</p></div></section><section className="listing-section"><div className="container"><div className="report-list">{reports.length ? reports.map((r) => <article className="report-row" key={r._id}><div><strong>{r.title}</strong><p>{r.period}{r.publishedAt ? ` · publicado em ${new Intl.DateTimeFormat('pt-BR').format(new Date(r.publishedAt))}` : ''}</p></div>{r.file?.asset?.url ? <a className="button button-small" href={r.file.asset.url} target="_blank" rel="noreferrer">Abrir PDF ↗</a> : <span className="muted">PDF indisponível</span>}</article>) : <div className="empty-state">Os relatórios publicados pela equipe aparecerão aqui.</div>}</div></div></section></>
}
