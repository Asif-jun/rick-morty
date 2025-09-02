import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import s from './CharacterPage.module.css'

// Типизация персонажа
interface Character {
  id: number
  name: string
  image: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
}

// Типизация для пагинации
interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

// Карточка одного персонажа
const CharacterCard = ({ character }: { character: Character }) => {
  // Определяем цвет статуса персонажа
  const getStatusClass = () => {
    switch (character.status) {
      case 'Alive':
        return s.alive
      case 'Dead':
        return s.dead
      default:
        return s.unknown
    }
  }

  return (
    <div className={s.character}>
      <div className={s.name}>{character.name}</div>
      {/* Кружок цвета статуса */}
      <div className={getStatusClass()}></div>
      <img src={character.image} alt={character.name} />
    </div>
  )
}

export const CharacterPage = () => {
  // Состояние для списка персонажей
  const [characters, setCharacters] = useState<Character[]>([])
  // Состояние для пагинации
  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })
  // Ошибки запроса
  const [error, setError] = useState<string | null>(null)

  // Функция для запроса конкретной страницы
  const fetchPage = (url: string | null) => {
    if (!url) return
    axios
      .get<{ results: Character[]; info: Info }>(url)
      .then(res => {
        setCharacters(res.data.results) // сохраняем персонажей
        setInfo(res.data.info) // обновляем инфо для пагинации
        setError(null) // сбрасываем ошибку
      })
      .catch(() => setError('Ошибка загрузки данных'))
  }

  // Первый рендер страницы, загружаем первую страницу персонажей
  useEffect(() => fetchPage('https://rickandmortyapi.com/api/character'), [])

  // Обработчик поиска по имени
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    fetchPage(`https://rickandmortyapi.com/api/character?name=${value}`)
  }

  return (
    <div className='pageContainer'>
      <h1 className='pageTitle'>Персонажи</h1>
      {/* Поле поиска */}
      <input
        type='search'
        className={s.search}
        placeholder='Поиск...'
        onChange={searchHandler}
      />

      {/* Ошибка запроса */}
      {error && <div className='errorMessage'>{error}</div>}

      {/* Список персонажей */}
      <div className={s.list}>
        {characters.map(c => (
          <Link key={c.id} to={`/characters/${c.id}`}>
            <CharacterCard character={c} />
          </Link>
        ))}
      </div>

      {/* Кнопки пагинации */}
      <div className={s.buttons}>
        <button disabled={!info.prev} onClick={() => fetchPage(info.prev)}>
          Назад
        </button>
        <button disabled={!info.next} onClick={() => fetchPage(info.next)}>
          Вперед
        </button>
      </div>
    </div>
  )
}
