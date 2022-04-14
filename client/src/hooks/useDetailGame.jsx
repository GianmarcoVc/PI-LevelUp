import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGameDetail } from '../redux/actions'

const useDetailGame = (idGame) => {
  const dispatch = useDispatch()
  const { gameDetail: game } = useSelector(state => state)
  const gameValues = !!Object.values(game).length

  const [slide, setSlide] = useState({ position: 0, stop: false })
  const [imgSelect, setImgSelect] = useState({ id: 0, src: '', view: false })

  useEffect(() => {
    dispatch(getGameDetail(idGame))
    return () => dispatch(getGameDetail())
  }, [])

  const handleModalImage = e => {
    const id = Number(e.target.id)
    return setImgSelect({ id, src: game.screenshots[id], view: !imgSelect.view })
  }

  const moveCarrusel = moveRight => {
    const posicionProxima = moveRight ? slide.position - 275 : slide.position + 275

    if (moveRight) {
      const avancesDados = Math.floor(posicionProxima / -275)
      const itemsEnPantalla = Math.floor((window.innerWidth - 80) / 275)
      const stop = (avancesDados + itemsEnPantalla) === game.screenshots.length
      return setSlide({ position: slide.position - 275, stop })
    }
    posicionProxima <= 0 && setSlide({ position: slide.position + 275, stop: false })
  }

  const moveCarruselModal = moveRight => {
    const proximaImageId = imgSelect.id + (!moveRight ? -1 : 1)
    const newIdImage =
      (proximaImageId < 0) // Para dar el efecto de imagenes infinitas
        ? game.screenshots.length - 1 // Se vuelve a la ultima imagen
        : (proximaImageId >= game.screenshots.length)
            ? 0 // Se vuelve a la primera imagen
            : proximaImageId
    return setImgSelect({ ...imgSelect, id: newIdImage, src: game.screenshots[newIdImage] })
  }

  return {
    game,
    gameValues,
    slide,
    imgSelect,
    setImgSelect,
    handleModalImage,
    moveCarrusel,
    moveCarruselModal
  }
}

export default useDetailGame
