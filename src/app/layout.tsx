import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { SiteFooter, SiteHeader } from '@/components/SiteLayout'
import { sanityFetch } from '@/sanity/lib/client'
import { CONFIGURACOES_QUERY } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/types'
import { getSiteUrl } from '@/lib/siteUrl'
import './globals.css'

const sans = DM_Sans({ variable: '--font-sans', subsets: ['latin'] })
const serif = Playfair_Display({ variable: '--font-serif', subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings | null>(CONFIGURACOES_QUERY, {}, ['configuracoes'], null)
  const name = settings?.organizationName ?? 'Sua ONG'
  return { metadataBase: getSiteUrl(), title: { default: `${name} — Organização social`, template: `%s | ${name}` }, description: settings?.siteDescription ?? 'Cultivamos oportunidades e construímos futuros mais justos junto às comunidades.', openGraph: { type: 'website', locale: 'pt_BR', siteName: name }, robots: { index: true, follow: true } }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await sanityFetch<SiteSettings | null>(CONFIGURACOES_QUERY, {}, ['configuracoes'], null)
  return <html lang="pt-BR" className={`${sans.variable} ${serif.variable}`}><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader settings={settings} /><div id="conteudo" className="page-content">{children}</div><SiteFooter settings={settings} /></body></html>
}
