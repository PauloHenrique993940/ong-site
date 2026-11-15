import { defineField, defineType } from 'sanity'

export const configuracoesGerais = defineType({
  name: 'configuracoesGerais', title: 'Configurações gerais', type: 'document',
  fields: [
    defineField({ name: 'organizationName', title: 'Nome da organização', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'siteDescription', title: 'Descrição institucional', type: 'text', rows: 3, description: 'Resumo usado nos metadados e mecanismos de busca.', validation: (r) => r.max(180) }),
    defineField({ name: 'contactEmail', title: 'E-mail público', type: 'string', validation: (r) => r.email() }),
    defineField({ name: 'contactPhone', title: 'Telefone público', type: 'string' }),
    defineField({ name: 'pixKey', title: 'Chave PIX para doações', type: 'string', description: 'Chave pública que será exibida na página de doação.' }),
    defineField({ name: 'pixName', title: 'Titular da chave PIX', type: 'string' }),
    defineField({ name: 'pixBank', title: 'Instituição financeira', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
    defineField({ name: 'address', title: 'Endereço público', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'organizationName' } },
})
