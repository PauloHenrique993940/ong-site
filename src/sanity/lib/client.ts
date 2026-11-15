import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = [], fallback: T = [] as T): Promise<T> {
  if (!client) return fallback
  return client.fetch<T>(query, params, { next: { tags } })
}
