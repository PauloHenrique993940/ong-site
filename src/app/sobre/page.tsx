import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Quem somos', description: 'Conheça a missão e a forma de atuação do Instituto Raízes.' }
export default function SobrePage() {
  return <><section className="page-hero"><div className="container"><span className="eyebrow">Quem somos</span><h1>Raízes fortes. Futuros possíveis.</h1><p>Somos uma organização comprometida com o desenvolvimento de pessoas e comunidades. Acreditamos que a transformação começa com escuta, confiança e trabalho conjunto.</p></div></section><section className="section"><div className="container split-section"><div className="split-copy"><span className="eyebrow">Nossa maneira de fazer</span><h2>Construímos junto, nunca de longe.</h2><p>Nosso trabalho parte das potências que já existem em cada território. Em parceria com moradores, educadores e lideranças locais, criamos caminhos para ampliar direitos e oportunidades.</p><p>Atuamos com cuidado, transparência e compromisso de longo prazo, acompanhando cada iniciativa para aprender e evoluir com a comunidade.</p><Link className="button" href="/projetos">Conheça os projetos <span>↗</span></Link></div><div style={{ position: 'relative', height: 410 }}><Image className="split-image" src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=85" alt="Grupo de pessoas reunidas em uma atividade comunitária" fill sizes="(max-width: 800px) 100vw, 50vw" /></div></div></section></>
}
