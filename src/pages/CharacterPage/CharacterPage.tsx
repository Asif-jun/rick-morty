import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import s from './CharacterPage.module.css' // только стили страницы CharacterPage
import axios from 'axios'

// Типы данных из API
interface Character {
  id: number
  name: string
  image: string
}

interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

// Компонент карточки для CharacterPage
const CharacterCard = ({ character }: { character: Character }) => (
  <div className={s.character}>
    <div className={s.characterLink}>{character.name}</div>
    <img src={character.image} alt={`${character.name} avatar`} />
  </div>
)

export const CharacterPage = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })
  const [error, setError] = useState<string | null>(null)

  const fetchPage = (url: string | null) => {
    if (!url) return
    axios
      .get<{ results: Character[]; info: Info }>(url)
      .then(res => {
        setCharacters(res.data.results)
        setInfo(res.data.info)
        setError(null)
      })
      .catch(() => setError('Ошибка загрузки данных'))
  }

  const fetchData = (url: string) => {
    axios
      .get<{ results: Character[]; info: Info }>(url)
      .then(res => {
        setCharacters(res.data.results)
        setInfo(res.data.info)
        setError(null)
      })
      .catch(() => {
        setCharacters([])
        setInfo({ count: 0, pages: 0, next: null, prev: null })
        setError('Персонаж не найден')
      })
  }

  useEffect(() => {
    fetchPage('https://rickandmortyapi.com/api/character')
  }, [])

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    fetchData(`https://rickandmortyapi.com/api/character?name=${value}`)
  }

  return (
    <div className={'pageContainer'}>
      <h1 className={'pageTitle'}>CharacterPage</h1>

      <input
        type='search'
        className={s.search}
        onChange={searchHandler}
        placeholder='Search...'
      />

      {error && <div className='errorMessage'>{error}</div>}

      {!error && characters.length > 0 && (
        <>
          <div className={s.characters}>
            {characters.map(character => (
              <Link
                key={character.id}
                to={`/characters/${character.id}`} // ссылка на страницу Character.tsx
                className={s.characterLink}
              >
                <CharacterCard character={character} />
              </Link>
            ))}
          </div>

          <div className={s.buttonContainer}>
            <button
              className='linkButton'
              disabled={!info.prev}
              onClick={() => fetchPage(info.prev)}
            >
              Назад
            </button>
            <button
              className='linkButton'
              disabled={!info.next}
              onClick={() => fetchPage(info.next)}
            >
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  )
}
