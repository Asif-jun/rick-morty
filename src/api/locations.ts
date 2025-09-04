import type { LocationResponse } from '../types/location'

const BASE_URL = 'https://rickandmortyapi.com/api'

export const getLocations = async (
  page: number = 1
): Promise<LocationResponse> => {
  const res = await fetch(`${BASE_URL}/location?page=${page}`)
  if (!res.ok) {
    throw new Error('Failed to fetch locations')
  }
  return res.json()
}
