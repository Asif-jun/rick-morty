import { useState } from 'react'
import s from './EpisodePage.module.css'
import btn from '../../common/components/animatedButton/AnimatedButton.module.css'
import { SearchBox } from '../search/SearchBox'
import { AnimatedButton } from '../../common/components/animatedButton/AnimatedButton'
import { NotFound } from '../../common/components/notFound/NotFound'
import { PageTemplate } from '../../common/components/pageTemplate/PageTemplate'
import { Card } from '../../common/components/card/Card'
import { useFetch } from '../../common/hooks/useFetch'
import type { EpisodeResponse } from '../../types/episode'

export const EpisodePage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, loading, errorType } = useFetch<EpisodeResponse>(
    `https://rickandmortyapi.com/api/episode?page=${page}&name=${search}`
  )

  const episodes = data?.results || []
  const totalPages = data?.info?.pages || 1

  const nextPage = () => page < totalPages && setPage(prev => prev + 1)
  const prevPage = () => page > 1 && setPage(prev => prev - 1)

  return (
    <PageTemplate
      searchComponent={<SearchBox value={search} onChange={setSearch} />}
      loading={loading}
      errorType={errorType}
      notFoundComponent={<NotFound type='episode' />}
      paginationComponent={
        <div className={btn.buttonContainer}>
          <AnimatedButton onClick={prevPage} disabled={page === 1}>
            Prev
          </AnimatedButton>
          <AnimatedButton onClick={nextPage} disabled={page === totalPages}>
            Next
          </AnimatedButton>
        </div>
      }
      cardsClassName={s.cardsContainer}
    >
      {episodes.map(e => (
        <Card
          key={e.id}
          title={e.name}
          details={
            <>
              <div>Episode: {e.episode}</div>
              <div>Air date: {e.air_date}</div>
            </>
          }
        />
      ))}
    </PageTemplate>
  )
}
