import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post', title: 'Notícia', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required().max(100) }),
    defineField({ name: 'slug', title: 'Endereço da notícia', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required(), description: 'Use “Gerar” para criar o endereço a partir do título.' }),
    defineField({ name: 'excerpt', title: 'Resumo', type: 'text', rows: 3, validation: (r) => r.required().max(220), description: 'Resumo curto que aparece nos cards e nos resultados de busca.' }),
    defineField({ name: 'mainImage', title: 'Imagem de capa', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Descrição da imagem', type: 'string', validation: (r) => r.required(), description: 'Descreva a imagem para leitores de tela.' })] }),
    defineField({ name: 'publishedAt', title: 'Data de publicação', type: 'datetime', initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Categoria', type: 'string', options: { list: ['Institucional', 'Projetos', 'Eventos', 'Impacto'] } }),
    defineField({ name: 'body', title: 'Conteúdo da notícia', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }], description: 'Escreva o texto e adicione imagens usando a barra do editor.' }),
  ],
  preview: { select: { title: 'title', media: 'mainImage', date: 'publishedAt' }, prepare({ title, media, date }) { return { title, subtitle: date ? new Date(date).toLocaleDateString('pt-BR') : '', media } } },
})
