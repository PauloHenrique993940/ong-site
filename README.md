# Raízes — site institucional

Site institucional e portal de conteúdo feito com Next.js App Router, TypeScript, Tailwind CSS e Sanity Studio.

## Começar localmente

1. `npm install`
2. Copie `.env.example` para `.env.local` e informe o Project ID e o dataset do Sanity. Defina também `NEXT_PUBLIC_SITE_URL` com a URL final antes do deploy.
3. `npm run dev`
4. Abra `http://localhost:3000`; o Studio fica em `/studio`.

Sem credenciais do Sanity, o site inicia e mostra estados vazios nos espaços gerenciados pelo CMS. O Studio precisa de um projeto Sanity real configurado para editar conteúdo.

## Preparar o Sanity

1. Crie ou selecione um projeto Sanity e defina `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET`.
2. Em **sanity.io/manage → API settings → CORS origins**, adicione `http://localhost:3000` e a URL do site publicado; habilite credenciais somente para origens do Studio.
3. Em **sanity.io/manage → API → Webhooks**, crie um webhook para `https://SEU_DOMINIO/api/revalidate`.
4. Selecione Create, Update e Delete; filtre `_type in ["post", "projeto", "relatorioTransparencia", "configuracoesGerais"]`; projeção `{_type}`; método POST.
5. Defina um segredo forte no webhook e o mesmo valor em `SANITY_REVALIDATE_SECRET` na Vercel.
6. Publique um documento para que as rotas com tags correspondentes sejam revalidadas.

## Conteúdo e identidade

Os schemas ficam em `src/sanity/schemaTypes`. O conteúdo editável inclui notícias, projetos, relatórios PDF e configurações gerais (contato, redes sociais e chave PIX). Antes de publicar o site, substitua nome, e-mail, textos, imagens e métricas demonstrativas pelos dados oficiais da ONG.

## Deploy

Importe `ong-site` como projeto na Vercel, configure as três variáveis de ambiente acima e faça o deploy. O deploy padrão inclui o plano Hobby da Vercel, sujeito aos limites e termos vigentes da plataforma.
