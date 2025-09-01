import { useEffect, useState } from 'react'
import s from './CharacterPage.module.css'
import axios from 'axios'

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

// Карточка одного персонажа
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

  // Функция для пагинации
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

  // Функция для поиска
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

  // Загрузка первой страницы при монтировании
  useEffect(() => {
    fetchPage('https://rickandmortyapi.com/api/character')
  }, [])

  // Обработчик поиска
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
          {/* Список карточек персонажей */}
          <div className={s.characters}>
            {characters.map(c => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>

          {/* Кнопки пагинации */}
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
