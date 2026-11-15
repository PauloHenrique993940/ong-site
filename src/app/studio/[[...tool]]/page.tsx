import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { hasSanityConfig } from '@/sanity/env'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!hasSanityConfig) {
    return <main className="studio-notice"><span className="eyebrow">Configuração pendente</span><h1>Conecte o projeto Sanity</h1><p>O site e os schemas estão prontos. Para abrir o painel editorial, adicione o Project ID do Sanity em <code>.env.local</code> e reinicie o servidor.</p><pre>NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id{ '\n' }NEXT_PUBLIC_SANITY_DATASET=production</pre><p>Depois, adicione <code>http://localhost:3000</code> às origens CORS do projeto Sanity.</p></main>
  }
  return <div className="min-h-screen"><NextStudio config={config} /></div>
}
