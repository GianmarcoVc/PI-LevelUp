import './OptionsFilter.scss'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, setGamesView } from '../../redux/actions';

const OptionsFilter = () => {
  const dispatch = useDispatch()
  const { gamesAll, gamesName, gamesNow, genres, barFilter } = useSelector(state => state)

  useEffect(() => {
    !genres.length && dispatch(getGenres())
  }, [dispatch, genres])

  // Dropdown de cada uno
  const [drop, setDrop] = useState({
    genres: false,
    order: false,
    creator: false
  });

  // Cuales estan checkeados
  const [check, setCheck] = useState({
    genreFilter: [],
    asc_title: false,
    desc_title: false,
    asc_rating: false,
    desc_rating: false,
    gamesAPI: false,
    gamesDB: false,
  });

  const copyGames = gamesNow === 'all' ? gamesAll : gamesName

  const handleChange = e => {
    let checked = e.target.checked
    let value = e.target.defaultValue

    var gamesFilter

    // Filter Genres
    if(e.target.className === 'check_genre'){

      let filterGenres

      if(checked){ filterGenres = [...check.genreFilter, value] } 
      else { filterGenres = [...check.genreFilter].filter(e => e !== value) }

      setCheck({...check, genreFilter: filterGenres })

      // Si no se filtra nada
      if(!filterGenres.length) {return dispatch(setGamesView(copyGames))}

      // Filtrado

      // Uno de los filtros esta entre los generos
      gamesFilter = copyGames.filter(a => a.genres.some(g => filterGenres.includes(g.name)))
      // Que todos los generos esten incluidos en los filtros
      // let gamesFilter = copyGames.filter(a => a.genres.every(g => filterGenres.includes(g.name)))
      
      // Todos los filtros de Genero // filtros = generos
      // let gamesFilter = copyGames.filter(ga => 
      //   filterGenres.length === ga.genres.length && filterGenres.every(f => ga.genres.some(ge => ge.name == f))
      // )
      
      // Si no se encuentran juegos
      if(!gamesFilter.length) {return dispatch(setGamesView(false))}

      return dispatch(setGamesView(gamesFilter))
    }

    // Creador
    const gamesDB = copyGames.filter(g => Number(g.id) !== g.id)
    const gamesApi = copyGames.filter(g => Number(g.id) === g.id)

    if(checked){
      setCheck({...check, [value]: true})

      // Orden Alfabetico
      var orderAlf = [...copyGames].sort((a,b) => a.name > b.name ? 1 : -1)

      if(value === 'asc_title'){
        dispatch(setGamesView(orderAlf))
      }
      if(value === 'desc_title'){
        dispatch(setGamesView(orderAlf.reverse()))
      }

      // Orden Rating
      var orderRat = [...copyGames].sort((a,b) => a.rating - b.rating)

      if(value === 'asc_rating'){
        dispatch(setGamesView(orderRat))
      }
      if(value === 'desc_rating'){
        dispatch(setGamesView(orderRat.reverse()))
      }

      // Creador
      if (value === 'gamesDB' && check.gamesAPI || value === 'gamesAPI' && check.gamesDB){
        return dispatch(setGamesView(copyGames))
      } 
      if(value === 'gamesDB'){
        if(!gamesDB.length) return dispatch(setGamesView(false))
        return dispatch(setGamesView(gamesDB))
      } 
      if (value === 'gamesAPI'){
        dispatch(setGamesView(gamesApi))
      }
      
    } 
    else {
      setCheck({...check, [value]: false})

      if(value === 'gamesDB' && check.gamesAPI){
        return dispatch(setGamesView(gamesApi))
      } else if (value === 'gamesAPI' && check.gamesDB){
        if(!gamesDB.length) return dispatch(setGamesView(false))
        return dispatch(setGamesView(gamesDB))
      }
      dispatch(setGamesView(copyGames))
    }
  }
  
  return (
    <div id='boxForm' 
    style={{width: barFilter ? 'max-content' : '0'}}>
      <form 
        id='formFilter'
        onChange={e => handleChange(e)}
      >

        <div className="option">
          <div className='drop' 
          onClick={() => setDrop({...drop, genres: !drop.genres})}>
            <p className='title'>Genres</p>
            <i className='fas fa-chevron-down' 
            style={{transform: drop.genres ? 'rotate(-180deg)' : 'rotate(0deg)'}}/>
          </div>

          <div className='dropdown'
          style={{display: drop.genres ? 'flex' : 'none'}}>
            {genres.map((g,i) => 
              <div className='input_group' key={i}>
                <input 
                  value={g} 
                  type="checkbox" 
                  className='check_genre' 
                />
                <label htmlFor={g}>{g}</label>
              </div>
            )}
          </div>

        </div>

        <div className="option">
          <div className='drop' 
          onClick={() => setDrop({...drop, order: !drop.order})}>
            <p className='title'>Order</p>
            <i className='fas fa-chevron-down' 
            style={{transform: drop.order ? 'rotate(-180deg)' : 'rotate(0deg)'}}/>
          </div>

          <div className='dropdown'
          style={{display: drop.order ? 'flex' : 'none'}}>
            <div className='input_group'>
              <input type="checkbox" value='asc_title' disabled={check.desc_title || check.asc_rating || check.desc_rating}/>
              <label htmlFor='asc_title'>Alphabetically (A-Z)</label>
            </div>
            <div className='input_group'>
              <input type="checkbox" value='desc_title' disabled={check.asc_title || check.asc_rating || check.desc_rating}/>
              <label htmlFor='desc_title'>Alphabetically (Z-A)</label>
            </div>
            <div className='input_group'>
              <input type="checkbox" value='asc_rating' disabled={check.asc_title || check.desc_title || check.desc_rating}/>
              <label htmlFor='asc_rating'>Rating (Lower-Higher)</label>
            </div>
            <div className='input_group'>
              <input type="checkbox" value='desc_rating' disabled={check.asc_title || check.desc_title || check.asc_rating}/>
              <label htmlFor='desc_rating'>Rating (Higher-Lower)</label>
            </div>
          </div>
        </div>

        <div className="option">
          <div className='drop' 
          onClick={() => setDrop({...drop, creator: !drop.creator})}>
            <p className='title'>Creator</p>
            <i className='fas fa-chevron-down' 
            style={{transform: drop.creator ? 'rotate(-180deg)' : 'rotate(0deg)'}}/>
          </div>

          <div className='dropdown'
          style={{display: drop.creator ? 'flex' : 'none'}}>
            <div className='input_group'>
              <input type="checkbox" value='gamesDB'/>
              <label htmlFor='gamesDB'>Alone of Me</label>
            </div>
            <div className='input_group'>
              <input type="checkbox" value='gamesAPI'/>
              <label htmlFor='gamesAPI'>Games of Api</label>
            </div>
          </div>
        </div>

        {/* { Object.values(check).some(e => e) &&
          <button type='reset' >Clean filters</button>
        } */}

      </form>
    </div>
  )
};

export default OptionsFilter;
