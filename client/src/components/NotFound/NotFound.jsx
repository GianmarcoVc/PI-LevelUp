import './NotFound.scss';
import { Link } from 'react-router-dom'

const NotFound = () => {
  document.title = 'Level Up | Page Not Found'

  return (
    <div id='notFound'>
      <h1 id='title'>404</h1>
      <p id='desc'>No esperabamos esta visita, estas opciones podrían ayudarte.</p>
      <a className='link' onClick={() => history.back()}>Regresar</a>
      <Link to='/games' className='link'>Ir a Juegos</Link>
    </div>
	)
}

export default NotFound;
