import logo from '../../assets/img/logo.png'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

export const Header = () => {
  return (
    <nav className={s.container}>
      <NavLink to={'/'}>
        <img className={s.logo} src={logo} alt='logotype' />
      </NavLink>

      <NavLink
        to={'/'}
        className={({ isActive }) =>
          isActive ? `${s.headerLink} ${s.activeLink}` : s.headerLink
        }
      >
        Home
      </NavLink>

      <NavLink
        to={'/characters'}
        className={({ isActive }) =>
          isActive ? `${s.headerLink} ${s.activeLink}` : s.headerLink
        }
      >
        Characters
      </NavLink>

      <NavLink
        to={'/locations'}
        className={({ isActive }) =>
          isActive ? `${s.headerLink} ${s.activeLink}` : s.headerLink
        }
      >
        Locations
      </NavLink>

      <NavLink
        to={'/episodes'}
        className={({ isActive }) =>
          isActive ? `${s.headerLink} ${s.activeLink}` : s.headerLink
        }
      >
        Episodes
      </NavLink>
    </nav>
  )
}
