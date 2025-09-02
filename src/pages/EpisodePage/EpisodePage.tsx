import { useEffect, useState } from 'react'
import s from './EpisodePage.module.css'
import axios from 'axios'

// Типизация эпизода
interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
}

interface Info {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export const EpisodePage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [info, setInfo] = useState<Info>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  })
  const [error, setError] = useState<string | null>(null)

  // Функция для загрузки страницы эпизодов
  const fetchPage = (url: string | null) => {
    if (!url) return
    axios
      .get<{ results: Episode[]; info: Info }>(url)
      .then(res => {
        setEpisodes(res.data.results)
        setInfo(res.data.info)
        setError(null)
      })
      .catch(() => setError('Ошибка загрузки данных'))
  }

  // Первичная загрузка
  useEffect(() => {
    fetchPage('https://rickandmortyapi.com/api/episode')
  }, [])

  return (
    <div className='pageContainer'>
      <h1 className='pageTitle'>Episodes</h1>

      {error && <div className='errorMessage'>{error}</div>}

      {!error && episodes.length > 0 && (
        <>
          <div className={s.episodesContainer}>
            {episodes.map(ep => (
              <div key={ep.id} className={s.episodeCard}>
                <h2 className={s.episodeTitle}>{ep.name}</h2>
                <p>
                  <b>Air Date:</b> {ep.air_date}
                </p>
                <p>
                  <b>Code:</b> {ep.episode}
                </p>
                <p>
                  <b>Characters:</b> {ep.characters.length}
                </p>
              </div>
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
