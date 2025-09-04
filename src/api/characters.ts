import type { CharacterResponse } from '../types/character'

const BASE_URL = 'https://rickandmortyapi.com/api'

export const getCharacters = async (
  page: number = 1
): Promise<CharacterResponse> => {
  const res = await fetch(`${BASE_URL}/character?page=${page}`)
  if (!res.ok) {
    throw new Error('Failed to fetch characters')
  }
  return res.json()
}
