import './Games.scss'
import ListGames from '../../containers/ListGames/ListGames'
import OptionsFilter from '../../containers/OptionsFilter/OptionsFilter'
import Footer from '../../components/Footer/Footer'
import Fondo from '../../assets/backgrounds/games.jpg'

const Games = () => {

  document.title = 'Level Up | Games'

  return (
    <div id='games'>
      <div id="headerFondo" style={{backgroundImage: `url(${Fondo})`}}></div>
      <div id="content">
        <OptionsFilter/>
        <ListGames/>
      </div>
      <Footer/>
    </div>
  )
}

export default Games;
