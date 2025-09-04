import { useEffect, useState } from 'react'
import { getEpisodes } from '../../api/episodes'
import type { Episode } from '../../types/episode'
import s from './EpisodePage.module.css'

export const EpisodePage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    getEpisodes(1).then(data => setEpisodes(data.results))
  }, [])

  return (
    <div className={s.container}>
      <h1 className='pageTitle'>Эпизоды</h1>
      <div className={s.episodesList}>
        {episodes.map(ep => (
          <div key={ep.id} className={s.episodeCard}>
            <h2 className={s.episodeName}>{ep.name}</h2>
            <p>
              <b>Дата выхода:</b> {ep.air_date}
            </p>
            <p>
              <b>Код эпизода:</b> {ep.episode}
            </p>
            <p>
              <b>Количество персонажей:</b> {ep.characters.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
