import type { Info } from './common'

// Локация
export interface Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

// Ответ от API при запросе списка локаций
export interface LocationResponse {
  info: Info
  results: Location[]
}
