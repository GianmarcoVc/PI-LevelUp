import { Link } from 'react-router-dom'

import styles from './Footer.module.scss'
import { LogoWhite } from '../../assets'

const Footer = () => (
  <footer id={styles.footer}>
    <section id={styles.infoFooter}>
      <article className={styles.box}>
        <Link to='/'>
          <img
            alt='Level Up'
            src={LogoWhite}
            id={styles.logo}
          />
        </Link>
        <p id={styles.desc}>We create posibilities for the connected world.</p>
      </article>
      <article className={styles.box}>
        <p className={styles.title}>Explore</p>
        <Link to='/' className={styles.link}>Home</Link>
        <Link to='/games' className={styles.link}>Games</Link>
        <Link to='/create' className={styles.link}>Create</Link>
        <Link to='/about' className={styles.link}>About</Link>
      </article>
      <article className={styles.box}>
        <p className={styles.title}>Follow Us</p>
        <a
          target='_blank'
          className={styles.link}
          rel='noopener noreferrer'
          href='https://github.com/GianmarcoVc'
        >GitHub
        </a>
        <a
          target='_blank'
          className={styles.link}
          rel='noopener noreferrer'
          href='https://www.linkedin.com/in/gianmarco-valentin/'
        >Linkedin
        </a>
      </article>
    </section>
    <p id={styles.copyr}>&#0169; 2022 Envoy. Design and Coded at Gianmarco</p>
  </footer>
)

export default Footer
