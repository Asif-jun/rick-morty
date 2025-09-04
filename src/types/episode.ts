import type { Info } from './common'

// Эпизод
export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string // например "S01E01"
  characters: string[]
  url: string
  created: string
}

// Ответ от API при запросе списка эпизодов
export interface EpisodeResponse {
  info: Info
  results: Episode[]
}
