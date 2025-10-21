import { NavLink } from 'react-router'
import s from './Homepage.module.css'

export const HomePage = () => {
  return (
    <div className={s.pageContainer}>
      <h1 className={`pageTitle ${s.title}`}>The Rick and Morty</h1>
      <div className={s.linkWrapper}>
        <NavLink to={'/characters'} className={'linkButton'}>
          Characters
        </NavLink>
        <NavLink to={'/locations'} className={'linkButton'}>
          Locations
        </NavLink>
        <NavLink to={'/episodes'} className={'linkButton'}>
          Episodes
        </NavLink>
      </div>
    </div>
  )
}
