import React from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

import styles from './NavbarMobile.module.scss'

const NavbarMobile = ({ navLinks, sidebar, setSidebar }) => {
  const location = useLocation().pathname
  return (
    <motion.ul
      className={styles.navBarMobile}
      initial={{ x: '-100%' }}
      animate={sidebar ? { x: '0' } : { x: '-100%' }}
    >
      {navLinks.map((e, i) =>
        <Link
          key={i}
          to={e.ruta}
          onClick={() => setSidebar(false)}
          className={`${styles.opt} ${location === e.ruta ? styles.active : styles.desactive}`}
        >
          {e.icon}
          <p>{e.name}</p>
        </Link>
      )}
    </motion.ul>
  )
}

export default NavbarMobile
