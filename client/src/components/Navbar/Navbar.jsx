import './Navbar.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'

import Search from '../Search/Search'
import { setBarFilter } from '../../redux/actions'
import LogoColor from '../../assets/logo/color.svg'

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const [sidebar, setSidebar] = useState(false);

  let navLinks = [
    {
      name: 'Home',
      ruta: '/',
      icon: 'fas fa-home'
    },
    {
      name: 'Games',
      ruta: '/games',
      icon: 'fas fa-gamepad'
    },
    {
      name: 'Create',
      ruta: '/create',
      icon: 'fas fa-plus'
    },
    {
      name: 'About',
      ruta: '/about',
      icon: 'fas fa-user-alt'
    }
  ]

  return (
    <>
      <nav id="navbar">
        <Link to='/'>
          <img src={LogoColor} id='logo' alt="Level Up" />
        </Link>
        <ul className='pages desktop'>
          {navLinks.map((e,i) => 
            <Link to={e.ruta} key={i}
            className={location === e.ruta ? 'active' : 'desactive'}
            >{e.name}</Link>
          )}
        </ul>
        {location === '/games' && 
          <>
            <Search/>
            <i id='filter'
              className='fas fa-filter'
              onClick={e => dispatch(setBarFilter())}
            />
          </>
        }
        <i 
          id='burguer'
          onClick={() => setSidebar(!sidebar)}
          className={sidebar ? 'fas fa-times' : 'fas fa-bars'}
        />
      </nav>
      <ul 
        className='pages mobile' 
        style={{transform: sidebar ? 'translateX(0%)' : 'translateX(-100%)'}}
      >
        {navLinks.map((e,i) => 
          <Link to={e.ruta} key={i}
          className={`opt ${location === e.ruta ? 'active' : 'desactive'}`}
          onClick={() => setSidebar(false)}>
            <i className={e.icon}/>
            <p>{e.name}</p>
          </Link>  
        )}
      </ul>
      <Outlet/>
    </>
  )
}

export default Navbar
