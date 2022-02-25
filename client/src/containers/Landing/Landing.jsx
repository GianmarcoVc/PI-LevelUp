import './Landing.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import PhotoGames from '../../assets/landing/games.png'
import PhotoCreate from '../../assets/landing/create.png'
import BackgroundDeco2 from '../../assets/landing/points.png'
import PhotoChracters from '../../assets/landing/personajes.png'
import BackgroundDeco from '../../assets/landing/gave_points.png'

const Landing = () => {

  const [select, setSelect] = useState('')

  return (
    <main id="landing" >
      <img id='deco1' src={BackgroundDeco}/>
      <img id='deco2' src={BackgroundDeco2}/>
      <section id="principal">
        <div id='content'>
          <h1 id='title'>Disfruta del mundo de los <b>videojuegos</b></h1>
          <p id='desc'>Explora el amplio catálogo de juegos que tenemos para ti. Encuentra tus éxitos de taquilla favoritos según el filtro que desees, y si no lo encuentras? Puedes crearlo.</p>
        </div>
        <img id='personajesGames' src={PhotoChracters} alt='Personajes de tus Videojuegos Favoritos'/>
      </section>

      <section id='cards'>
        <Link 
          to='/games' 
          className={`card__item ${select === 'games' ? 'select' : 'deselect'}`}
          onMouseEnter={() => setSelect('games')}
          onMouseLeave={() => setSelect('')}
        >
            <img className='card__img' src={PhotoGames} alt='Videojuegos'/>
            <div className='card__content'>
              <h2>Todos los Juegos</h2>
              <p>Accede a más de 100 juegos, busca y encuentra tu juego favorito.</p>
            </div>
        </Link>
        <Link 
          to='/create' 
          className={`card__item ${select === 'create' ? 'select' : 'deselect'}`}
          onMouseEnter={() => setSelect('create')}
          onMouseLeave={() => setSelect('')}
        >
            <img className='card__img' src={PhotoCreate} alt='Videojuegos'/>
            <div className='card__content'>
              <h2>Publica tu Juego</h2>
              <p>No esperes más y publica tu juego, para mostrarselo a todo el mundo.</p>
            </div>
        </Link>
      </section>
      <Footer/>
    </main>
  )
}

export default Landing
