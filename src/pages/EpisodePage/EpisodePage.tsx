import { useEffect, useState } from 'react'
import axios from 'axios'
import s from './EpisodePage.module.css'
import { SearchBox } from '../SearchBox/SearchBox'
import { AnimatedButton } from '../../common/AnimatedButton/AnimatedButton'
import { Card } from '../../common/Card/Card'
import type { Episode, EpisodeResponse } from '../../types/episode'

export const EpisodePage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    axios
      .get<EpisodeResponse>(
        `https://rickandmortyapi.com/api/episode?page=${page}&name=${search}`
      )
      .then(res => {
        setEpisodes(res.data.results)
        setTotalPages(res.data.info.pages)
        setError(null)
      })
      .catch(() => setError('Не удалось загрузить эпизоды'))
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
      <h1 className='pageTitle'>Эпизоды</h1>

      <SearchBox
        value={search}
        onChange={val => {
          setSearch(val)
          setPage(1)
        }}
      />

      {error && <div className={s.error}>{error}</div>}
      {loading && <div className={s.loader}>Loading...</div>}

      {!loading && !error && episodes.length === 0 && (
        <div className={s.error}>Эпизоды не найдены</div>
      )}

      {!loading && !error && episodes.length > 0 && (
        <div className={s.cardsContainer}>
          {episodes.map(ep => (
            <Card
              key={ep.id}
              title={ep.name}
              details={
                <>
                  <span>
                    <b>Дата выхода:</b> {ep.air_date}
                  </span>
                  <br />
                  <span>
                    <b>Код эпизода:</b> {ep.episode}
                  </span>
                  <br />
                  <span>
                    <b>Персонажей:</b> {ep.characters.length}
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
