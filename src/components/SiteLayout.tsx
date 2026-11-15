import Link from 'next/link'
import type { SiteSettings } from '@/sanity/types'

const links = [{ href: '/sobre', label: 'Quem somos' }, { href: '/projetos', label: 'Projetos' }, { href: '/noticias', label: 'Notícias' }, { href: '/transparencia', label: 'Transparência' }]

export function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  const name = settings?.organizationName ?? 'Sua ONG'
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="brand" aria-label={`${name}, início`}><span className="brand-mark">{name.slice(0, 1).toLowerCase()}.</span><span>{name}<span className="brand-dot">.</span><small>organização social</small></span></Link>
    <nav className="main-nav" aria-label="Navegação principal">{links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
    <Link className="button button-small header-cta" href="/doe">Apoie uma causa <span aria-hidden="true">↗</span></Link>
  </div></header>
}

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const name = settings?.organizationName ?? 'Sua ONG'
  const email = settings?.contactEmail ?? 'contato@suaong.org.br'
  const socials = [
    { href: settings?.instagram, label: 'Instagram' },
    { href: settings?.facebook, label: 'Facebook' },
    { href: settings?.linkedin, label: 'LinkedIn' },
  ].filter((item): item is { href: string; label: string } => Boolean(item.href))
  return <footer className="site-footer"><div className="container footer-main">
    <div><Link href="/" className="brand brand-light"><span className="brand-mark">{name.slice(0, 1).toLowerCase()}.</span><span>{name}<span className="brand-dot">.</span><small>organização social</small></span></Link><p>{settings?.siteDescription ?? 'Trabalhamos junto às comunidades para cultivar oportunidades e construir futuros mais justos.'}</p>{socials.length > 0 && <nav className="social-links" aria-label="Redes sociais">{socials.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>)}</nav>}</div>
    <div><span className="footer-label">Explore</span>{links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
    <div><span className="footer-label">Faça parte</span><Link href="/doe">Doe para a causa</Link><Link href="/doe#contato">Fale com a gente</Link><a href={`mailto:${email}`}>{email}</a>{settings?.contactPhone && <a href={`tel:${settings.contactPhone.replace(/[^\d+]/g, '')}`}>{settings.contactPhone}</a>}</div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {name}.</span><Link href="/studio">Área da equipe ↗</Link></div></footer>
}
