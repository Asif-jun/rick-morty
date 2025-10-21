import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import s from './Character.module.css'
import type { Character as CharacterType } from '../../types/character'

// Функция для определения класса кружка статуса
function getStatusClass(status: CharacterType['status']) {
  switch (status) {
    case 'Alive':
      return `${s.status} ${s.aliveStatus}`
    case 'Dead':
      return `${s.status} ${s.deadStatus}`
    default:
      return `${s.status} ${s.unknownStatus}`
  }
}

export const Character = () => {
  const { id } = useParams<{ id: string }>() // Берём id персонажа из URL
  const [character, setCharacter] = useState<CharacterType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    axios
      .get<CharacterType>(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => {
        setCharacter(res.data)
        setError(null)
      })
      .catch(() => setError('Не удалось загрузить персонажа'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className='pageContainer'>Loading...</div>
  if (error)
    return (
      <div className='pageContainer'>
        <div className='errorMessage'>{error}</div>
      </div>
    )
  if (!character) return null

  const { name, image, status, species, location, episode } = character

  return (
    <div className='pageContainer'>
      <h1 className={s.pageTitle}>{name}</h1>
      <div className={s.container}>
        <img className={s.img} src={image} alt={name} />
        <div className={s.description}>
          <div className={s.statusContainer}>
            <div className={getStatusClass(status)} />
            <div>
              {status} — {species}
            </div>
          </div>

          <div className={s.info}>
            <p className={s.subTitle}>Last known location:</p>
            <p className={s.subTitleResult}>{location?.name || 'unknown'}</p>
          </div>

          <div className={s.info}>
            <p className={s.subTitle}>Episode count:</p>
            <p className={s.subTitleResult}>{episode?.length || 0}</p>
          </div>
        </div>
      </div>

      <Link to='/characters' className='linkButton'>
        Go back
      </Link>
    </div>
  )
}
