import './ListGames.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGamesAll, setBarFilter, setGamesNow, setGamesView, setPage } from '../../redux/actions';

import Game from '../../components/Game/Game'
import Pagination from '../../components/Pagination/Pagination'
import LoadingGames from '../../components/LoadingGames/LoadingGames'

const ListGames = () => {
  const dispatch = useDispatch()
  const { gamesAll, gamesView, gamesNow, page, history } = useSelector(state => state)
  useEffect(() => {
    !gamesAll.length && dispatch(getGamesAll())
  }, []);

  const gamesPage = gamesView ? gamesView.slice(page*15-15, page*15) : []

  if(!gamesPage.length && gamesView.length){
    dispatch(setPage(Math.ceil(gamesView.length / 15)))
  }

  return (
    <div id='listGames'>
      <div id="options">
        <div className="switchFilter" onClick={() => dispatch(setBarFilter())}>
          <i className='fas fa-filter'/>
          <h3>Filter</h3>
        </div>
        {gamesNow === 'name' &&
          <h3 
            id="clearFilters"
            onClick={() => {
              dispatch(setGamesNow('all'))
              dispatch(setGamesView(gamesAll))
            }}
          >Borrar resultado</h3>
        }
      </div>
      <section className="sectionGames">
        <div className="infoGames">
          <h2>{gamesNow === 'all' ? 'Todos los Juegos' : `Búsquedas Relacionadas con ${history[0]}`}</h2>
          <Pagination size={gamesView.length}/>
        </div>
        <div className="contentGames">
          {gamesView 
          ? !gamesView.length 
            ? gamesPage.map((g,i) =>
                <Game 
                  key={i}
                  id={g.id}
                  name={g.name}
                  genres={g.genres}
                  rating={g.rating}
                  img={g.background_image}
                />
              )
            : <LoadingGames/> 
          : <h3>No se encontraron resultados</h3> }
        </div>
        <Pagination size={gamesView.length}/>
      </section>
    </div>
  )
}

export default ListGames;
