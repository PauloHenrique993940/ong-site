import { defineField, defineType } from 'sanity'

export const relatorioTransparencia = defineType({
  name: 'relatorioTransparencia', title: 'Relatório de transparência', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título do relatório', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'period', title: 'Período de referência', type: 'string', description: 'Ex.: Janeiro a dezembro de 2025', validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Data de publicação', type: 'date', initialValue: () => new Date().toISOString().slice(0, 10) }),
    defineField({ name: 'file', title: 'Arquivo PDF', type: 'file', options: { accept: 'application/pdf' }, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'period' } },
})
