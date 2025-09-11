import { useEffect, useState } from 'react'
import axios from 'axios'
import s from './LocationPage.module.css'
import { SearchBox } from '../SearchBox/SearchBox'
import { AnimatedButton } from '../../common/AnimatedButton/AnimatedButton'
import { Card } from '../../common/Card/Card'
import type { Location, LocationResponse } from '../../types/location'

export const LocationPage = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    axios
      .get<LocationResponse>(
        `https://rickandmortyapi.com/api/location?page=${page}&name=${search}`
      )
      .then(res => {
        setLocations(res.data.results)
        setTotalPages(res.data.info.pages)
        setError(null)
      })
      .catch(() => setError('Не удалось загрузить локации'))
      .finally(() => setLoading(false))
  }, [page, search])

  const nextPageHandler = () => {
    if (page < totalPages) setPage(prev => prev + 1)
  }

  const previousPageHandler = () => {
    if (page > 1) setPage(prev => prev - 1)
  }

  return (
    <div className={s.pageContainer}>
      <SearchBox value={search} onChange={setSearch} />

      {error && <div className={s.error}>{error}</div>}
      {loading && <div className={s.loader}>Loading...</div>}

      {!loading && !error && locations.length === 0 && (
        <div className={s.error}>Локации не найдены</div>
      )}

      {!loading && !error && locations.length > 0 && (
        <div className={s.cardsContainer}>
          {locations.map(loc => (
            <Card
              key={loc.id}
              title={loc.name}
              details={
                <>
                  <span>
                    <b>Тип:</b> {loc.type}
                  </span>
                  <br />
                  <span>
                    <b>Измерение:</b> {loc.dimension}
                  </span>
                  <br />
                  <span>
                    <b>Персонажей:</b> {loc.residents.length}
                  </span>
                </>
              }
            />
          ))}
        </div>
      )}

      <div className={s.buttonContainer}>
        <AnimatedButton
          onClick={previousPageHandler}
          disabled={loading || page === 1}
        >
          Назад
        </AnimatedButton>
        <AnimatedButton
          onClick={nextPageHandler}
          disabled={loading || page === totalPages}
        >
          Вперед
        </AnimatedButton>
      </div>
    </div>
  )
}
