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

// Компонент карточки персонажа
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

  // Общая функция для загрузки страницы
  const fetchPage = (url: string | null) => {
    if (!url) return
    axios
      .get<{ results: Character[]; info: Info }>(url)
      .then(res => {
        setCharacters(res.data.results)
        setInfo(res.data.info)
      })
      .catch(console.error)
  }

  // Загрузка первой страницы
  useEffect(() => {
    fetchPage('https://rickandmortyapi.com/api/character')
  }, [])

  return (
    <div className={'pageContainer'}>
      <h1 className={'pageTitle'}>CharacterPage</h1>

      {characters.length > 0 && (
        <>
          <div className={s.characters}>
            {characters.map(c => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>

          <div className={s.buttonContainer}>
            <button
              className='linkButton'
              onClick={() => fetchPage(info.prev)}
              disabled={!info.prev}
            >
              Назад
            </button>
            <button
              className='linkButton'
              onClick={() => fetchPage(info.next)}
              disabled={!info.next}
            >
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  )
}
