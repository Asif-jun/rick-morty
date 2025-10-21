import { useState } from 'react'
import s from './CharacterPage.module.css'
import btn from '../../common/components/animatedButton/AnimatedButton.module.css'
import { SearchBox } from '../search/SearchBox'
import { AnimatedButton } from '../../common/components/animatedButton/AnimatedButton'
import { NotFound } from '../../common/components/notFound/NotFound'
import { PageTemplate } from '../../common/components/pageTemplate/PageTemplate'
import { Card } from '../../common/components/card/Card'
import { useFetch } from '../../common/hooks/useFetch'
import type { CharacterResponse } from '../../types/character'

export const CharacterPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, loading, errorType } = useFetch<CharacterResponse>(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`
  )

  const characters = data?.results || []
  const totalPages = data?.info?.pages || 1

  const nextPage = () => page < totalPages && setPage(prev => prev + 1)
  const prevPage = () => page > 1 && setPage(prev => prev - 1)

  return (
    <PageTemplate
      searchComponent={<SearchBox value={search} onChange={setSearch} />}
      loading={loading}
      errorType={errorType} // 'network' | 'notFound' | null
      notFoundComponent={<NotFound type='character' />}
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
      cardsClassName={s.cardContainer}
    >
      {characters.map(c => (
        <Card
          key={c.id}
          title={c.name}
          details={
            <>
              <img
                src={c.image}
                alt={c.name}
                style={{ width: '100%', borderRadius: 5 }}
              />
              <div>
                {c.status} — {c.species}
              </div>
            </>
          }
        />
      ))}
    </PageTemplate>
  )
}
