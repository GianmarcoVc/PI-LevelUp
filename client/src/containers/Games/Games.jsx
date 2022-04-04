import { Helmet, HelmetProvider } from 'react-helmet-async'

import styles from './Games.module.scss'
import { GamesBanner } from '../../assets'
import { ListGames, OptionsFilter, Footer } from '../../components'

const Games = () => (
  <>
    <HelmetProvider>
      <Helmet>
        <title>Level Up | Games</title>
      </Helmet>
    </HelmetProvider>
    <main id={styles.games}>
      <img
        src={GamesBanner}
        id={styles.headerFondo}
      />
      <section id={styles.content}>
        <OptionsFilter />
        <ListGames />
      </section>
    </main>
    <Footer />
  </>
)

export default Games
