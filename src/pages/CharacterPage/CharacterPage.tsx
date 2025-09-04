import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import s from './CharacterPage.module.css'
import { CharacterNotFound } from './CharacterNotFound'

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

  if (loading) return <div className={s.pageContainer}>Loading...</div>
  if (error) return <div className={s.pageContainer}>{error}</div>
  if (filteredCharacters.length === 0) return <CharacterNotFound />

  return (
    <div className={s.pageContainer}>
      <input
        type='text'
        placeholder='Search characters...'
        className={s.search}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

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

      <div className={s.buttonContainer}>
        <button
          onClick={previousPageHandler}
          disabled={page === 1}
          className={s.linkButton}
        >
          Назад
        </button>
        <button
          onClick={nextPageHandler}
          disabled={info ? page === info.pages : true}
          className={s.linkButton}
        >
          Вперед
        </button>
      </div>
    </div>
  )
}
