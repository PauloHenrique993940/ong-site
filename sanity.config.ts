'use client'

import { defineConfig } from 'sanity'
import { structureTool, type StructureResolver } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { dataset, projectId } from './src/sanity/env'

const structure: StructureResolver = (S) => S.list().title('Conteúdo').items([
  S.documentTypeListItem('post').title('Notícias'),
  S.documentTypeListItem('projeto').title('Projetos'),
  S.documentTypeListItem('relatorioTransparencia').title('Relatórios de transparência'),
  S.listItem().title('Configurações gerais').child(
    S.document().schemaType('configuracoesGerais').documentId('configuracoesGerais'),
  ),
])

export default defineConfig({
  name: 'ong', title: 'Portal da ONG', projectId: projectId || 'configure-project-id', dataset,
  basePath: '/studio', plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => template.schemaType !== 'configuracoesGerais'),
  },
})
