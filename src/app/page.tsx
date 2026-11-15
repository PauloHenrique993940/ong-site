import Image from 'next/image'
import Link from 'next/link'
import { NewsCards, ProjectCards } from '@/components/Cards'
import { sanityFetch } from '@/sanity/lib/client'
import { NOTICIAS_QUERY, PROJETOS_QUERY } from '@/sanity/lib/queries'

export const metadata = { title: 'Início' }

export default async function HomePage() {
  const [news, projects] = await Promise.all([
    sanityFetch<Array<{ _id: string; title: string; slug?: { current: string }; excerpt?: string; publishedAt?: string; category?: string; mainImage?: unknown }>>(NOTICIAS_QUERY, { search: null, start: 0, end: 3 }, ['posts', 'site']),
    sanityFetch<Array<{ _id: string; title: string; slug?: { current: string }; summary?: string; status?: string; location?: string; coverImage?: unknown }>>(PROJETOS_QUERY, {}, ['projetos', 'site']),
  ])
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">Instituto de impacto social</span><h1>Um futuro mais justo começa <em>perto de casa.</em></h1><p>Trabalhamos junto às comunidades para transformar desafios locais em oportunidades que florescem para todos.</p><div className="hero-actions"><Link className="button" href="/projetos">Conheça nosso trabalho <span>↗</span></Link><Link className="text-link" href="/sobre">Nossa história <span>↗</span></Link></div></div>
      <div className="hero-visual"><Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85" alt="Crianças e educadoras participam de uma atividade em comunidade" fill priority sizes="(max-width: 800px) 100vw, 50vw" /><div className="floating-note"><strong>O futuro se cultiva</strong><span>com cuidado, presença e oportunidade.</span></div><span className="hero-caption">Juntos, fazemos acontecer</span></div></div></section>
    <section className="impact-band"><div className="container impact-grid"><div className="impact-intro">Mudanças reais<br />começam em comunidade.</div><div className="impact-stat"><strong>Educação</strong><span>conhecimento e autonomia</span></div><div className="impact-stat"><strong>Cuidado</strong><span>relações que acolhem</span></div><div className="impact-stat"><strong>Oportunidade</strong><span>novos caminhos possíveis</span></div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">Onde a mudança acontece</span><h2>Oportunidades que<br />crescem com as pessoas.</h2></div><p>Nossos projetos são construídos com quem vive os desafios todos os dias. Assim, cada iniciativa nasce da escuta e cresce com propósito.</p></div><ProjectCards items={projects.slice(0, 3)} /><div className="center-action"><Link className="button button-line" href="/projetos">Ver todos os projetos <span>↗</span></Link></div></div></section>
    <section className="quote-section"><div className="container quote-inner"><div className="quote-mark" aria-hidden="true">✳</div><div><blockquote>Uma transformação que respeita o tempo e a voz de cada comunidade.</blockquote><cite>Nosso jeito de trabalhar</cite></div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">Acompanhe de perto</span><h2>Histórias que merecem<br />ser compartilhadas.</h2></div><Link className="text-link" href="/noticias">Todas as notícias <span>↗</span></Link></div><NewsCards items={news} /></div></section>
    <section className="section" style={{ paddingTop: 0 }}><div className="container"><div className="cta-panel"><div><span className="eyebrow">Faça parte da mudança</span><h2>Tem espaço para você<br />nessa história.</h2><p>Seu apoio ajuda a levar cuidado, educação e novas possibilidades a mais comunidades.</p></div><Link className="button" href="/doe">Quero apoiar <span>↗</span></Link></div></div></section>
  </>
}
