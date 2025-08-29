import { NavLink } from 'react-router'
import s from './Homepage.module.css'

// type HomePageProps = {}
export const HomePage = () => {
  return (
    <div>
      <h1 className={`pageTitle ${s.title}`}>The Rick and Morty</h1>
      <div>
        <NavLink to={'/characters'}>Characters</NavLink>
        <NavLink to={'/locations'}>Locations</NavLink>
        <NavLink to={'/episodes'}>Episodes</NavLink>
      </div>
    </div>
  )
}
