import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { FaStar, FaCalendar, FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import styles from './DetailGame.module.scss'
import { getGameDetail } from '../../redux/actions'
import { Footer, LoadingDetail, NotFound } from '../../components'
import ModalImage from '../../components/ModalImage/ModalImage'

const DetailGame = () => {
  const { idGame } = useParams()
  const dispatch = useDispatch()
  const { gameDetail: game } = useSelector(state => state)
  const gameValues = !!Object.values(game).length

  const [slide, setSlide] = useState({ p: 0, stop: false })
  const [imgSelect, setImgSelect] = useState({ id: 0, src: '', view: false })

  useEffect(() => {
    dispatch(getGameDetail(idGame))
    return () => dispatch(getGameDetail())
  }, [])

  const moveCarrusel = n => {
    const result = n ? slide.p - 275 : slide.p + 275
    if (n) {
      const size = Math.floor((window.innerWidth - 80) / 275)
      const avance = Math.floor(result / -275)

      if ((avance + size) === game.screenshots.length) {
        return setSlide({ p: slide.p - 275, stop: true })
      } else return setSlide({ p: slide.p - 275, stop: false }) // delante
    } else result <= 0 && setSlide({ p: slide.p + 275, stop: false }) // atras
  }

  const handleViewImage = e => {
    const id = Number(e.target.id)
    return setImgSelect({ id: id, src: game.screenshots[id], view: !imgSelect.view })
  }

  const handleChange = b => {
    const idNow = imgSelect.id
    if (!b) {
      const id = idNow - 1
      if (id < 0) {
        const valueF = game.screenshots.length - 1
        return setImgSelect({ ...imgSelect, id: valueF, src: game.screenshots[valueF] })
      }
      return setImgSelect({ ...imgSelect, id, src: game.screenshots[id] })
    }
    const id = idNow + 1
    if (id >= game.screenshots.length) {
      return setImgSelect({ ...imgSelect, id: 0, src: game.screenshots[0] })
    }
    return setImgSelect({ ...imgSelect, id, src: game.screenshots[id] })
  }

  return game.error
    ? <NotFound isGame />
    : !gameValues
        ? <LoadingDetail />
        : (
          <>
            <HelmetProvider>
              <Helmet>
                <title>{`Level Up | ${game.name}`}</title>
              </Helmet>
            </HelmetProvider>
            <main
              id={styles.detailGame}
              style={{
                backgroundImage: `
                  linear-gradient(-150deg, transparent, black ),
                  url(${game.background_image})
                `
              }}
            >
              <section id={styles.infoVideoGame}>
                <section id={styles.info}>
                  <h1 id={styles.title}>{game.name}</h1>
                  <div id={styles.atributes}>
                    {['genres', 'platforms', 'tags'].map((a, i) =>
                      <div
                        key={i}
                        className={a}
                      >
                        {game[a].map((g, i) => i < 2 && <span key={i}>{g.name || g}</span>)}
                      </div>
                    )}
                  </div>
                  <p id={styles.desc}>{game.description_raw}</p>
                  {game.website &&
                    <a
                      target='_blank'
                      rel='noreferrer'
                      id={styles.website}
                      href={game.website}
                    >
                      {game.website}
                    </a>}
                  <div id={styles.infoExtra}>
                    <p><FaStar /> {game.rating}</p>
                    <p><FaCalendar /> {game.released}</p>
                  </div>
                </section>
                {game.videoData &&
                  <video
                    muted
                    controls
                    autoPlay
                    id={styles.trailer}
                    poster={game.videoPreview}
                  >
                    <source src={game.videoData[480]} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>}
              </section>
              {game.screenshots &&
                <>
                  <section id={styles.screenshots}>
                    <div id={styles.carrusel}>
                      <FaAngleLeft
                        onClick={() => moveCarrusel(false)}
                        style={{ display: (slide.p === 0) && 'none' }}
                        className={`${styles.iconMove} ${styles.left}`}
                      />
                      <div
                        id={styles.images}
                        style={{ transform: `translateX(${slide.p}px)` }}
                      >
                        {game.screenshots.map((e, i) =>
                          <img
                            id={i}
                            src={e}
                            key={i}
                            className={styles.screen}
                            onClick={e => handleViewImage(e)}
                          />
                        )}
                      </div>
                      <FaAngleRight
                        onClick={() => moveCarrusel(true)}
                        className={`${styles.iconMove} ${styles.right}`}
                        style={{ display: (slide.stop || game.screenshots.length < 3 || window.innerWidth < 480) ? 'none' : 'flex' }}
                      />
                    </div>
                  </section>
                  {imgSelect.view &&
                    <ModalImage
                      srcImage={imgSelect.src}
                      imgSelect={imgSelect}
                      setImage={setImgSelect}
                      moveCarrusel={handleChange}
                      iconsMove={game.screenshots.length > 1}
                    />}
                </>}
            </main>
            <Footer />
          </>)
}

export default DetailGame
