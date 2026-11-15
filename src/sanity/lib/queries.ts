import { defineQuery } from 'next-sanity'

export const NOTICIAS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current) && (!defined($search) || title match $search)] | order(publishedAt desc) [$start...$end] { _id, title, slug, excerpt, publishedAt, category, mainImage { asset, alt } }`)
export const NOTICIAS_COUNT_QUERY = defineQuery(`count(*[_type == "post" && defined(slug.current) && (!defined($search) || title match $search)])`)
export const NOTICIA_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{ _id, title, slug, excerpt, publishedAt, category, mainImage { asset, alt }, body }`)
export const PROJETOS_QUERY = defineQuery(`*[_type == "projeto" && defined(slug.current)] | order(_createdAt desc) { _id, title, slug, summary, status, location, impact, coverImage { asset, alt } }`)
export const RELATORIOS_QUERY = defineQuery(`*[_type == "relatorioTransparencia"] | order(publishedAt desc) { _id, title, period, publishedAt, file { asset->{url, originalFilename} } }`)
export const CONFIGURACOES_QUERY = defineQuery(`*[_type == "configuracoesGerais" && _id == "configuracoesGerais"][0]{ organizationName, siteDescription, contactEmail, contactPhone, pixKey, pixName, pixBank, instagram, facebook, linkedin, address }`)
