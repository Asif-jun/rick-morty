import { useEffect, useState } from 'react'
import axios from 'axios'
import s from './LocationPage.module.css'

// Словарь для перевода названий локаций с английского на русский
const translateName = (name: string) => {
  const dict: Record<string, string> = {
    'Earth (C-137)': 'Земля (C-137)',
    Abadango: 'Абаданго',
    'Citadel of Ricks': 'Цитадель Риков',
  }
  return dict[name] || name
}

// Типизация локации
interface Location {
  id: number
  name: string
  type: string
  dimension: string
}

// Типизация пагинации
interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export const LocationPage = () => {
  const [locations, setLocations] = useState<Location[]>([]) // список локаций
  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  }) // пагинация

  // Запрос страницы локаций
  const fetchPage = (url: string | null) => {
    if (!url) return
    axios.get<{ results: Location[]; info: Info }>(url).then(res => {
      setLocations(res.data.results) // сохраняем локации
      setInfo(res.data.info) // обновляем инфо пагинации
    })
  }

  // Первый рендер — загружаем первую страницу локаций
  useEffect(() => fetchPage('https://rickandmortyapi.com/api/location'), [])

  return (
    <div className='pageContainer'>
      <h1 className='pageTitle'>Локации</h1>

      {/* Список локаций */}
      <div className={s.list}>
        {locations.map(l => (
          <div key={l.id} className={s.item}>
            <div>{translateName(l.name)}</div>
            <div>{l.type}</div>
            <div>{l.dimension}</div>
          </div>
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
