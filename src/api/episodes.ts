import type { EpisodeResponse } from '../types/episode'

const BASE_URL = 'https://rickandmortyapi.com/api'

export const getEpisodes = async (
  page: number = 1
): Promise<EpisodeResponse> => {
  const res = await fetch(`${BASE_URL}/episode?page=${page}`)
  if (!res.ok) {
    throw new Error('Failed to fetch episodes')
  }
  return res.json()
}
