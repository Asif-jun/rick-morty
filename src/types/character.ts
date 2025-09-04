import type { Info } from './common'

// Персонаж
export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

// Ответ от API при запросе списка персонажей
export interface CharacterResponse {
  info: Info
  results: Character[]
}
