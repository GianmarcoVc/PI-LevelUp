import './Search.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGamesName, setHistory } from '../../redux/actions'

const Search = () => {
  const dispatch = useDispatch()
  const { history } = useSelector(state => state)

  const [recomend, setRecomend] = useState(false)
  const [search, setSearch] = useState('')

  const getGames = title => {
    dispatch(getGamesName(title))
    dispatch(setHistory(title))  
  }

  const handleSubmitTitle = e => {
    e.preventDefault()
    if(search.length){ 
      getGames(search)
    }
  }

  const handleClick = e => {
    const title = e.target.textContent
    getGames(title)
    setSearch(title)
  }

  return (
    <form 
      id='search'
      onSubmit={e => handleSubmitTitle(e)}
    >
        <input 
          type="" 
          id='titleGame' 
          name='titleGame' 
          placeholder='Buscar Juegos'
          onFocus={() => setRecomend(true)}
          onBlur={() => setRecomend(false)}
          onChange={e => setSearch(e.target.value)}
        />
        <div id="history" className={recomend ? 'view' : 'hide'}>
            {history.map((e,i) =>
              e.includes(search) &&
              <div 
                key={i}
                id="item"
                onClick={e => handleClick(e)}
              >
                <i className='fas fa-search'/> 
                <span>{e}</span>
              </div>
            )}
        </div>
    </form>
  )
}

export default Search