import { defineField, defineType } from 'sanity'

export const projeto = defineType({
  name: 'projeto', title: 'Projeto', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nome do projeto', type: 'string', validation: (r) => r.required().max(100) }),
    defineField({ name: 'slug', title: 'Endereço do projeto', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'summary', title: 'Resumo', type: 'text', rows: 3, validation: (r) => r.required().max(220), description: 'Apresentação curta para a página de projetos.' }),
    defineField({ name: 'coverImage', title: 'Imagem de capa', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Descrição da imagem', type: 'string', validation: (r) => r.required() })] }),
    defineField({ name: 'status', title: 'Situação', type: 'string', options: { list: [{ title: 'Em andamento', value: 'andamento' }, { title: 'Concluído', value: 'concluido' }, { title: 'Planejado', value: 'planejado' }] }, initialValue: 'andamento', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Local de atuação', type: 'string', description: 'Cidade, região ou comunidade atendida.' }),
    defineField({ name: 'startDate', title: 'Data de início', type: 'date' }),
    defineField({ name: 'endDate', title: 'Data de término', type: 'date' }),
    defineField({ name: 'impact', title: 'Resultados e indicadores', type: 'array', of: [{ type: 'string' }], description: 'Ex.: “120 famílias atendidas” ou “3 oficinas realizadas”.' }),
    defineField({ name: 'body', title: 'Descrição completa', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
  ],
  preview: { select: { title: 'title', media: 'coverImage', status: 'status' }, prepare({ title, media, status }) { return { title, subtitle: status, media } } },
})
