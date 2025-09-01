import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import s from './Character.module.css'
import axios from 'axios'

// Типизация персонажа
interface CharacterDetail {
  id: number
  name: string
  image: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  location: { name: string }
  episode: string[]
}

export const Character = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState<CharacterDetail | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => setCharacter(res.data))
        .catch(console.error)
    }
  }, [id])

  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'Alive':
        return `${s.status} ${s.aliveStatus}`
      case 'Dead':
        return `${s.status} ${s.deadStatus}`
      case 'unknown':
        return `${s.status} ${s.unknownStatus}`
      default:
        return s.status
    }
  }

  if (!character) return <div className='pageContainer'>Loading...</div>

  return (
    <div className='pageContainer'>
      <div className={s.container}>
        <h1 className='pageTitle'>{character.name}</h1>
        <div className={s.content}>
          <img className={s.img} src={character.image} alt={character.name} />
          <div className={s.description}>
            <div className={s.statusContainer}>
              <div className={getStatusClassName(character.status)}></div>
              <div>
                {character.status} - {character.species}
              </div>
            </div>
            <div className={s.info}>
              <p className={s.subTitle}>Last known location:</p>
              <p className={s.subTitleResult}>{character.location.name}</p>
            </div>
            <div className={s.info}>
              <p className={s.subTitle}>Episode count:</p>
              <p className={s.subTitleResult}>{character.episode.length}</p>
            </div>
          </div>
        </div>
        <Link to='/characters' className='linkButton'>
          Go back
        </Link>
      </div>
    </div>
  )
}
