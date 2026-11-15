import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import type { NextRequest } from 'next/server'

type Payload = { _type?: string }

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return Response.json({ error: 'Webhook não configurado' }, { status: 500 })

  const { isValidSignature, body } = await parseBody<Payload>(request, secret, true)
  if (!isValidSignature || !body?._type) return Response.json({ error: 'Assinatura inválida' }, { status: 401 })

  const tags: Record<string, string[]> = {
    post: ['posts', 'site'], projeto: ['projetos', 'site'], relatorioTransparencia: ['transparencia', 'site'], configuracoesGerais: ['configuracoes', 'site'],
  }
  const affected = tags[body._type]
  if (!affected) return Response.json({ ignored: true, type: body._type })
  for (const tag of affected) revalidateTag(tag, 'max')
  return Response.json({ revalidated: affected })
}
