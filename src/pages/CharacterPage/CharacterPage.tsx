// CharacterPage.tsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import s from './CharacterPage.module.css'
import btn from '../../common/components/AnimatedButton/AnimatedButton.module.css'
import { SearchBox } from '../SearchBox/SearchBox'
import { AnimatedButton } from '../../common/components/AnimatedButton/AnimatedButton'
import { NotFound } from '../../common/components/NotFound/NotFound'
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
        setCharacters(res.data.results)
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
    <div className={s.pageContainer}>
      <SearchBox value={search} onChange={setSearch} />

      {loading && <div className={s.loader}>Loading...</div>}

      {!loading && (error || characters.length === 0) && <NotFound />}

      {!loading && !error && characters.length > 0 && (
        <>
          {/* Карточки */}
          <div className={s.cardContainer}>
            {characters.map(c => (
              <div key={c.id} className={s.card}>
                <div className={s.cardTitle}>{c.name}</div>
                <Link to={`/characters/${c.id}`}>
                  <img src={c.image} alt={c.name} className={s.cardImage} />
                </Link>
                <div className={s.cardDescription}>
                  {c.status} — {c.species}
                </div>
              </div>
            ))}
          </div>

          {/* Контейнер кнопок с едиными стилями */}
          <div className={btn.buttonContainer}>
            <AnimatedButton
              onClick={prevPage}
              delay='0s'
              disabled={loading || page === 1}
            >
              Назад
            </AnimatedButton>
            <AnimatedButton
              onClick={nextPage}
              delay='0.2s'
              disabled={loading || page === totalPages}
            >
              Вперед
            </AnimatedButton>
          </div>
        </>
      )}
    </div>
  )
}
