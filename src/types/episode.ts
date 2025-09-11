import type { Info } from './common'

export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string // например "S01E01"
  characters: string[]
  url: string
  created: string
}

export type EpisodeResponse = {
  info: Info
  results: Episode[]
}
