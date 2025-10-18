// EpisodePage.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import s from './EpisodePage.module.css'
import btn from '../../common/components/AnimatedButton/AnimatedButton.module.css'
import { SearchBox } from '../searchBox/SearchBox'
import { AnimatedButton } from '../../common/components/animatedButton/AnimatedButton'
import { NotFound } from '../../common/components/notFound/NotFound'
import { PageTemplate } from '../../common/components/pageTemplate/PageTemplate'
import { Card } from '../../common/components/card/Card'
import type { Episode, EpisodeResponse } from '../../types/episode'

export const EpisodePage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
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
        setError(false)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [page, search])

  const nextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1)
  }
  const prevPage = () => {
    if (page > 1) setPage(prev => prev - 1)
  }

  return (
    <PageTemplate
      searchComponent={<SearchBox value={search} onChange={setSearch} />}
      loading={loading}
      error={error || episodes.length === 0}
      notFoundComponent={<NotFound />}
      paginationComponent={
        <div className={btn.buttonContainer}>
          <AnimatedButton onClick={prevPage} disabled={page === 1}>
            Назад
          </AnimatedButton>
          <AnimatedButton onClick={nextPage} disabled={page === totalPages}>
            Вперед
          </AnimatedButton>
        </div>
      }
    >
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
    </PageTemplate>
  )
}
