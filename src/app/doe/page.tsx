import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { CONFIGURACOES_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = { title: 'Apoie e entre em contato', description: 'Saiba como apoiar o trabalho e falar com o Instituto Raízes.' }
type Settings = { contactEmail?: string; contactPhone?: string; pixKey?: string; pixName?: string; pixBank?: string; address?: string }
export default async function DoePage() {
  const settings = await sanityFetch<Settings | null>(CONFIGURACOES_QUERY, {}, ['configuracoes'], null)
  const email = settings?.contactEmail ?? 'contato@suaong.org.br'
  return <><section className="page-hero"><div className="container"><span className="eyebrow">Faça parte</span><h1>Uma contribuição pode abrir novos caminhos.</h1><p>Seu apoio ajuda a sustentar iniciativas construídas com as comunidades. Entre em contato para conhecer as formas de contribuir.</p></div></section><section className="listing-section"><div className="container"><div className="donate-box"><span className="eyebrow">Apoie o trabalho</span><h2>Vamos conversar?</h2>{settings?.pixKey ? <div><p className="muted">Contribua via PIX. Confira os dados antes de transferir:</p><p><strong>Chave:</strong> {settings.pixKey}<br />{settings.pixName && <><strong>Titular:</strong> {settings.pixName}<br /></>}{settings.pixBank && <><strong>Instituição:</strong> {settings.pixBank}</>}</p></div> : <p className="muted">Os dados para doação podem ser publicados pela equipe nas configurações gerais do Studio.</p>}<a className="button" href={`mailto:${email}`}>Escrever para a equipe ↗</a></div><div id="contato" style={{ paddingTop: 48 }}><h2>Contato</h2><p className="muted">E-mail: <a href={`mailto:${email}`}>{email}</a></p>{settings?.contactPhone && <p className="muted">Telefone: {settings.contactPhone}</p>}{settings?.address && <p className="muted">{settings.address}</p>}<Link className="text-link" href="/transparencia">Consulte os relatórios <span>↗</span></Link></div></div></section></>
}
