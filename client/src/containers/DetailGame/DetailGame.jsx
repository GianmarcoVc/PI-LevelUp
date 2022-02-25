import './DetailGame.scss'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getGenres, getGameDetail } from '../../redux/actions';

import Footer from '../../components/Footer/Footer'
import LoadingDetail from '../../components/LoadingDetail/LoadingDetail'

const DetailGame = () => {
  const size = 480
  const dispatch = useDispatch()
  const { idGame } = useParams()
  const { genres, gameDetail: game } = useSelector(state => state)

  useEffect(() => {
      // dispatch(getGenres())
      dispatch(getGameDetail(idGame))
      return () => dispatch(getGameDetail())
  }, []);

  const [imgSelect, setImgSelect] = useState({id: 0, src: '', view: false});

  const handleView = e => {
    let id = Number(e.target.id)
    return setImgSelect({id: id, src: game.screenshots[id], view: !imgSelect.view })   
  }

  const handleChange = b => {
    const idNow = imgSelect.id
    if(!b){
      let id = idNow - 1
      if(id < 0){
        let valueF = game.screenshots.length - 1
        return setImgSelect({...imgSelect, id: valueF, src: game.screenshots[valueF]})
      }
      return setImgSelect({...imgSelect, id, src: game.screenshots[id]})
    }
    let id = idNow + 1
    if(id >= game.screenshots.length) {
      return setImgSelect({...imgSelect, id: 0, src: game.screenshots[0]})
    }
    return setImgSelect({...imgSelect, id, src: game.screenshots[id]})
  }

  const [slide, setSlide] = useState({p: 0, stop: false});

  const moveCarrusel = n =>{
    let result = n ? slide.p - 275 : slide.p + 275
    if(n) { 
      let size = Math.floor((window.innerWidth - 80) / 275)      
      let avance = Math.floor(result / -275)     
      
      if((avance + size) === game.screenshots.length) {return setSlide({p: slide.p - 275, stop: true})}
      else return setSlide({p: slide.p - 275, stop: false}) // delante
    }
    else result <= 0 && setSlide({p: slide.p + 275, stop: false}) // atras
  }

  if(game){document.title = `Level Up | ${game.name || 'No encontrado'}`}

  {return game
  ? <div id="boxDetailGame" style={{backgroundImage: `url(${game.background_image})`}}>
      {game.error 
      ? <div id="error">
          <h1 id='title'>{game.error}</h1>
          <h2 id='desc'>Es posible que el identificador del juego esté mal escrito o que el juego ya no exista.</h2>
          <div id='links'>
            <Link 
              to='/games'
            >Ver otros Juegos</Link>
            <Link 
              to='/create'
            >Crea tu Juego</Link>
          </div>
        </div>
      : <div id='content'>
          <section id='separation'>
            <section id='info'>
              <h1 id='title'>{game.name}</h1>
              <div id='atributes'>
                {!game.genres[0].name
                  ? game.genres.map((g,i) => i < 2 && <span key={i}>{g}</span>)
                  : game.genres.map((g,i) => i < 2 && <span key={i}>{g.name}</span>)
                }
                <span>|</span>
                {Array.isArray(game.platforms) 
                  ? game.platforms.map((p,i) =>  i < 2 && <span key={i}>{p}</span>)
                  : game.platforms.split(', ').map((p,i) =>  i < 2 && <span key={i}>{p}</span>)
                }
                <span>|</span>
                {Array.isArray(game.tags) 
                  ? game.tags.map((t,i) => i < 2 && <span key={i}>{t}</span>)
                  : game.tags.split(', ').map((t,i) =>  i < 2 && <span key={i}>{t}</span>)
                }
              </div>
              <p id='desc'>{`${game.description_raw.split('.').slice(0,3).join('.')}.`}</p>
              <div id="infoExtra">
                <p><i className='fas fa-star'/> {game.rating}</p>
                <p><i className='fas fa-calendar'/> {game.released}</p>
              </div>
            </section>
            {game.v_data &&
              <video id='trailer' poster={game.v_preview} controls>
                <source src={game.v_data[size]} type='video/mp4'/>
                Your browser does not support the video tag.
              </video>
            }
          </section>
          {game.screenshots &&
            <section id="screenshots">
              <div id="carrusel">
                <i 
                  className='fas fa-angle-left' 
                  onClick={() => moveCarrusel(false)}
                  style={{display: (slide.p === 0) && 'none'}}
                />
                <div id="images" style={{transform: `translateX(${slide.p}px)`}}>
                  {game.screenshots.map((e,i) => 
                      <img 
                        id={i}
                        src={e} 
                        key={i} 
                        className='screen' 
                        onClick={e => handleView(e)} 
                      />
                  )}
                </div>
                <i 
                  className='fas fa-angle-right' 
                  onClick={() => moveCarrusel(true)}
                  style={{display: slide.stop ? 'none' : 'flex'}}
                />
              </div>
              <div className={`viewImage ${imgSelect.view ? '' : 'hide'}`} >
                <div 
                  id="boxImage"
                  onMouseOver= {() => document.onclick = null}
                  onMouseOut={() => document.onclick = () => {
                    setImgSelect({...imgSelect, view: !imgSelect.view})
                    return document.onclick = null
                  }} 
                >
                  <i 
                    className={`fas fa-angle-left ${(imgSelect.id === 0) && 'disabled'}`} 
                    onClick={() => handleChange(false)}
                  />
                  <img 
                    id='image' 
                    src={imgSelect.src} 
                  />
                  <i 
                    className={`fas fa-angle-right ${(imgSelect.id === (game.screenshots.length - 1)) && 'disabled'}`} 
                    onClick={() => handleChange(true)}
                  />
                </div>
              </div>
            </section>
          }
        </div>
      }
      <Footer/>
    </div>
    : <LoadingDetail/>
  }
}

export default DetailGame
