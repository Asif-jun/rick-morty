import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Location } from '../../types/location'
import s from './LocationPage.module.css'

export const LocationPage = () => {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    axios
      .get<{ results: Location[] }>('https://rickandmortyapi.com/api/location')
      .then(res => setLocations(res.data.results))
  }, [])

  return (
    <div className='pageContainer'>
      <h1 className='pageTitle'>Локации</h1>
      <div className={s.locations}>
        {locations.map(loc => (
          <div key={loc.id} className={s.locationCard}>
            <h2 className={s.name}>{loc.name}</h2>
            <p>
              <b>Тип:</b> {loc.type}
            </p>
            <p>
              <b>Измерение:</b> {loc.dimension}
            </p>
            <p>
              <b>Персонажей:</b> {loc.residents.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
