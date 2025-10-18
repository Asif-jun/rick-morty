// CharacterPage.tsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import s from './CharacterPage.module.css'
import btn from '../../common/components/animatedButton/AnimatedButton.module.css'
import { SearchBox } from '../searchBox/SearchBox'
import { AnimatedButton } from '../../common/components/animatedButton/AnimatedButton'
import { NotFound } from '../../common/components/notFound/NotFound'
import { PageTemplate } from '../../common/components/pageTemplate/PageTemplate'
import { Card } from '../../common/components/card/Card'
import type { Character, CharacterResponse } from '../../types/character'

export const CharacterPage = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    axios
      .get<CharacterResponse>(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`
      )
      .then(res => {
        setCharacters(res.data.results || [])
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
      error={error} // ❌ только реальные ошибки
      notFoundComponent={<NotFound message='Character not found' />} // телевизор для пустого списка
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
                style={{ width: '100%', borderRadius: '5px' }}
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
