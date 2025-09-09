import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import s from './CharacterPage.module.css'
import { CharacterNotFound } from './CharacterNotFound'
import { SearchBox } from '../SearchBox/SearchBox'
import { AnimatedButton } from '../../common/AnimatedButton/AnimatedButton'

interface CharacterData {
  id: number
  name: string
  image: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
}

export const CharacterPage = () => {
  const [characters, setCharacters] = useState<CharacterData[]>([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState<{ pages: number } | null>(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(res => {
        setCharacters(res.data.results)
        setInfo(res.data.info)
        setError(null)
      })
      .catch(() => setError('Не удалось загрузить персонажей'))
      .finally(() => setLoading(false))
  }, [page])

  const filteredCharacters = characters.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const nextPageHandler = () => {
    if (info && page < info.pages) setPage(page + 1)
  }

  const previousPageHandler = () => {
    if (page > 1) setPage(page - 1)
  }

  return (
    <div className={s.pageContainer}>
      <SearchBox value={search} onChange={setSearch} />

      {error && <div className={s.error}>{error}</div>}
      {loading && <div className={s.loader}>Loading...</div>}

      {!loading && !error && filteredCharacters.length === 0 && (
        <CharacterNotFound />
      )}

      {!loading && !error && filteredCharacters.length > 0 && (
        <div className={s.characters}>
          {filteredCharacters.map(char => (
            <div className={s.character} key={char.id}>
              <div className={s.characterName}>{char.name}</div>
              <Link to={`/character/${char.id}`}>
                <img src={char.image} alt={char.name} className={s.avatar} />
              </Link>
              <div className={s.characterDescription}>
                {char.status} — {char.species}
              </div>
            </div>
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
          disabled={loading || (info ? page === info.pages : true)}
        >
          Вперед
        </AnimatedButton>
      </div>
    </div>
  )
}
