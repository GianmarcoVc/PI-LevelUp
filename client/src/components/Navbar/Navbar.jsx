import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FaHome, FaGamepad, FaPlus, FaUserAlt, FaFilter, FaTimes, FaBars } from 'react-icons/fa'

import styles from './Navbar.module.scss'
import { LogoColor } from '../../assets'
import { Search, NavbarMobile } from '../index'
import { setBarFilter } from '../../redux/actions'

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const [sidebar, setSidebar] = useState(false)

  const navLinks = [
    {
      name: 'Home',
      ruta: '/',
      icon: <FaHome />
    },
    {
      name: 'Games',
      ruta: '/games',
      icon: <FaGamepad />
    },
    {
      name: 'Create',
      ruta: '/create',
      icon: <FaPlus />
    },
    {
      name: 'About',
      ruta: '/about',
      icon: <FaUserAlt />
    }
  ]

  return (
    <>
      <nav id={styles.navbar}>
        <Link to='/'>
          <img
            alt='Level Up'
            src={LogoColor}
            id={styles.logo}
          />
        </Link>
        <ul id={styles.nav}>
          {navLinks.map((e, i) =>
            <Link
              key={i}
              to={e.ruta}
              className={`${styles.opt} ${location === e.ruta ? styles.active : styles.desactive}`}
            >{e.name}
            </Link>
          )}
        </ul>
        {location === '/games'
          ? (
            <>
              <Search isNavbar />
              <FaFilter
                id={styles.iconFilter}
                onClick={() => dispatch(setBarFilter())}
              />
            </>)
          : null}
        {sidebar
          ? <FaTimes
              id={styles.iconBurguer}
              onClick={() => setSidebar(!sidebar)}
            />
          : <FaBars
              id={styles.iconBurguer}
              onClick={() => setSidebar(!sidebar)}
            />}
      </nav>
      <NavbarMobile
        sidebar={sidebar}
        navLinks={navLinks}
        setSidebar={setSidebar}
      />
      <Outlet />
    </>
  )
}

export default Navbar
