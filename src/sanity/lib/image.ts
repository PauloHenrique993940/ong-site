import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

export function imageUrl(source: unknown) {
  if (!client || !source) return ''
  return imageUrlBuilder(client).image(source as Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0]).auto('format').url()
}
