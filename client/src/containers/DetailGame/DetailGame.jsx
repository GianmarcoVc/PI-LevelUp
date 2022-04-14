import { useParams } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { FaStar, FaCalendar, FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import styles from './DetailGame.module.scss'
import useDetailGame from '../../hooks/useDetailGame'
import { Footer, LoadingDetail, NotFound } from '../../components'
import ModalImage from '../../components/ModalImage/ModalImage'

const DetailGame = () => {
  const { idGame } = useParams()

  const {
    game,
    gameValues,
    slide,
    imgSelect,
    setImgSelect,
    handleModalImage,
    moveCarrusel,
    moveCarruselModal
  } = useDetailGame(idGame)

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
                        style={{ display: !slide.position && 'none' }}
                        className={`${styles.iconMove} ${styles.left}`}
                      />
                      <div
                        id={styles.images}
                        style={{ transform: `translateX(${slide.position}px)` }}
                      >
                        {game.screenshots.map((e, i) =>
                          <img
                            id={i}
                            src={e}
                            key={i}
                            className={styles.screen}
                            onClick={e => handleModalImage(e)}
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
                      moveCarrusel={moveCarruselModal}
                      iconsMove={game.screenshots.length > 1}
                    />}
                </>}
            </main>
            <Footer />
          </>)
}

export default DetailGame
