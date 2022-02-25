import './CreateGame.scss'
import { validate } from './Validate.jsx'
import { useState, useEffect } from 'react'
import { getGenres } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import Chracter from '../../assets/chracter_valorant.png'

const CreateGame = () => {
  const dispatch = useDispatch()

  const genres = useSelector(state => state.genres)
  const tags = ['Singleplayer', 'Multiplayer', 'RPG', 'Co-op', 'Funny']
  const platforms = ['PlayStation 5', 'PC', 'Xbox One', 'PlayStation 3']

  document.title = 'Level Up | Create'

  const initialState = {
    name: '',
    imageUrl: '',
    imageUpload: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: [],
    tags: []
  }

  const [game, setGame] = useState(initialState)
  const [error, setError] = useState(initialState)
  const [sendFirst, setSendFirst] = useState(false)
  const [select, setSelect] = useState({
    genres: false,
    tags: false,
    platforms: false
  })


  useEffect(() => {
    !genres.length && dispatch(getGenres())
    sendFirst && setError(validate(game))
  }, [dispatch, sendFirst, game, genres]) 

  const handleChange = e => {
    const name = e.target.name 
    const value = e.target.value

    if(name === 'genres' || name === 'platforms' || name === 'tags'){
      const checked = e.target.checked
      if(checked && !game[name].includes(value)){
        setGame({
          ...game,
          [name]: game[name].concat(value)
        })
      } else if(!checked){
        setGame({
          ...game,
          [name]: game[name].filter(v => v !== value)
        })
      }
    } else {
      setGame({
        ...game,
        [name]: value
      }) 
    }
  }

  const handleSubmit = e => {
    var result = ''
    if(!sendFirst) {
      setSendFirst(true)
      const validation = validate(game)
      setError(validation)  
      var result = validation
    }

    if(Object.values(result || error).some(e => e.length)){
      console.log('No se envio, faltan datos aún.')
      return e.preventDefault()
    }
  }

  const setSel = prop => {
    setSelect({...select, [prop]: !select[prop]})
  }

  return (  
    <div id="create">
      <form id='form' method="post" action="http://localhost:3001/videogame" encType='multipart/form-data'
       onChange={e => handleChange(e)} onSubmit={e => handleSubmit(e)}>
        <h2 id='title'>Your Game</h2>
        
        <div className="campo_form">

          <div className='content'>
            <label htmlFor="name" className='require'>Nombre</label>
            <input type="text" name="name" id="name" />
          </div>

          {error.name && <span className="error">{error.name}</span>}
        </div>
       
        <div className="campo_form">
          <label className='require'>Image</label>

          <div id='boxImage'>
            <label id='labelUpload' htmlFor='imageUpload' className={game.imageUpload ? 'checked' : game.imageUrl ? 'disabled' : ''}>
              <i className={`fas ${game.imageUpload ? 'fa-check' : game.imageUrl ? 'fa-times' :'fa-upload'} ${game.imageUrl && 'disabled'}`}/>
              <p>{game.imageUpload ? game.imageUpload.slice(12) : game.imageUrl ? 'Ya hay una imagen por url.' :'Ingresa tu imagen aqui'}</p>
            </label>
            <input type="file" name="imageUpload" id="imageUpload" accept='image/*' disabled={game.imageUrl}/>
            <input type="url" name="imageUrl" placeholder='Ingresa la Url de tu imagen' id="imageUrl" disabled={game.imageUpload}/>
          </div>

          {error.image && <span className="error">{error.image}</span>}
        </div>

        <div className="campo_form">
          <label htmlFor="description" className='require'>Description</label>
          <textarea name="description" id="textDesc"/>
          {error.description && <span className="error">{error.description}</span>}
        </div>

        <div className="campo_form">

          <div className='content'>
            <label htmlFor="released" className='require'>Release</label>
            <input type="date" name="released" id="released"/>
          </div>

          {error.released && <span className="error">{error.released}</span>}
        </div>
        
        <div className="campo_form">

          <div className='content'>
            <label htmlFor="rating" className='require'>Rating</label>
            <input type="number" name="rating" id="rating" step='0.01'/>
          </div>

          {error.rating && <span className="error">{error.rating}</span>}
        </div>
        
        <div className="campo_form">

          <div className='content'>
            <label className='require'>Genres</label>
            <div className="selected">
              {game.genres.length ?
                  <>
                    {game.genres.map((g,i) =>
                      <div className='select' key={i}>
                        <span>{g} <i className='fas fa-times-circle' 
                        onClick={() => setGame({...game, genres: game.genres.filter(i => i !== g)})}/></span>  
                      </div>
                    )}
                    <span 
                      id='plusItem'
                      title='Add other'
                      onClick={e => setSel('genres')}
                    >
                      Add other <i className='fas fa-plus'/>
                    </span>
                  </>
                : <p className='opt-select' onClick={e => setSel('genres')}>Select Here</p>
              }
            </div>

            <div className={`momentSelect ${select.genres && 'active'}`}>
              <div 
                className='optionsSelect'
                onMouseOver= {() => document.onclick = null}
                onMouseOut={() => document.onclick = () => {
                  setSel('genres')
                  return document.onclick = null
                }} 
              >
                {genres.map((g, i) => 
                  <>
                    <label 
                    key={i}
                    htmlFor={`genre${i}`} 
                    className={`selectNow ${game.genres.includes(g) && 'checked'}`}>
                    {g}</label>
                    <input type="checkbox" name="genres" id={`genre${i}`} value={g} 
                    disabled={game.genres.length > 4 && !game.genres.includes(g)}/>
                  </>
                )}
                <span className='numSelect'>Seleccionados: {game.genres.length} / 5</span>
              </div>
            </div>
          </div>
          {error.genres && <span className="error">{error.genres}</span>}
        </div>

        <div className="campo_form">

          <div className='content'>
            <label className='require'>Platforms</label>
            <div className="selected">
              {game.platforms.length ?
                <>
                  {game.platforms.map((p,i) =>
                      <div className='select' key={i}>
                        <span>{p} <i className='fas fa-times-circle' 
                        onClick={() => setGame({...game, platforms: game.platforms.filter(i => i !== p)})}/></span>  
                      </div>
                  )}
                  <span 
                    id='plusItem'
                    title='Add other'
                    onClick={e => setSel('platforms')}
                  >
                    Add other <i className='fas fa-plus'/>
                  </span>
                </>                
                : <p className='opt-select' onClick={e => setSel('platforms')}>Select Here</p>
              }
            </div>

            <div className={`momentSelect ${select.platforms && 'active'}`}>
              <div 
                className='optionsSelect'
                onMouseOver= {() => document.onclick = null}
                onMouseOut={() => document.onclick = () => {
                  setSel('platforms')
                  return document.onclick = null
                }} 
              >
                {platforms.map((p, i) => 
                  <>
                    <label 
                    key={i}
                    htmlFor={`platform${i}`} 
                    className={`selectNow ${game.platforms.includes(p) && 'checked'}`}>
                    {p}</label>
                    <input type="checkbox" name="platforms" id={`platform${i}`} value={p} />                
                  </>
                )}
                <span className='numSelect'>Seleccionados: {game.platforms.length}</span>
              </div>
            </div> 
          </div>
          {error.platforms && <span className="error">{error.platforms}</span>}
        </div>

        <div className="campo_form">

          <div className='content'>
            <label className='require'>Tags</label>
            <div className="selected">
              {game.tags.length ?
                <>
                  {game.tags.map((t,i) =>
                    <div className='select' key={i}>
                      <span>{t} <i className='fas fa-times-circle' 
                      onClick={() => setGame({...game, tags: game.tags.filter(i => i !== t)})}/></span>  
                    </div>
                  )}
                   <span 
                    id='plusItem'
                    title='Add other'
                    onClick={e => setSel('tags')}
                  >
                    Add other <i className='fas fa-plus'/>
                  </span>
                </>                
                : <p className='opt-select' onClick={e => setSel('tags')}>Select Here</p>
              }
            </div>

            <div className={`momentSelect ${select.tags && 'active'}`}>
              <div 
                className='optionsSelect'
                onMouseOver= {() => document.onclick = null}
                onMouseOut={() => document.onclick = () => {
                  setSel('tags')
                  return document.onclick = null
                }} 
              >
                {tags.map((t, i) => 
                  <>
                    <label 
                    key={i}
                    htmlFor={`tag${i}`} 
                    className={`selectNow ${game.tags.includes(t) && 'checked'}`}>
                    {t}</label>
                    <input type="checkbox" name="tags" id={`tag${i}`} value={t} />                
                  </>
                )}
                <span className='numSelect'>Seleccionados: {game.tags.length}</span>
              </div>
            </div> 
          </div>
          {error.tags && <span className="error">{error.tags}</span>}
        </div>

        <div className="campo_form">
          <div className='content'>
            <label htmlFor="website">Website</label>
            <input type="text" name='website' id='website'/>
          </div>
        </div>
        <input id='btnSub' type="submit" value='Publish your Game!'/>
      </form>
      <img id='character' src={Chracter} alt='Chracter Valorant'/>
    </div>
  )
}

export default CreateGame
