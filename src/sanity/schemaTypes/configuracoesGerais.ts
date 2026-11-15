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
    defineField({ name: 'bankName', title: 'Banco para transferência', type: 'string' }),
    defineField({ name: 'bankAgency', title: 'Agência', type: 'string' }),
    defineField({ name: 'bankAccount', title: 'Número da conta', type: 'string' }),
    defineField({ name: 'bankAccountType', title: 'Tipo de conta', type: 'string', options: { list: ['Corrente', 'Poupança'] } }),
    defineField({ name: 'bankHolder', title: 'Titular da conta', type: 'string' }),
    defineField({ name: 'bankDocument', title: 'CPF/CNPJ do titular', type: 'string', description: 'Informe somente se esse dado puder ser publicado para doadores.' }),
    defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
    defineField({ name: 'address', title: 'Endereço público', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'organizationName' } },
})
