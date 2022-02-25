import './Game.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SpinnerLoading from '../../components/SpinnerLoading/SnipperLoading'

const Game = ({key, id, name, genres, rating, img}) => {
  
  const [loaded, setLoaded] = useState(false);

  return (
    <Link to={`/game/${id}`} className='game' key={key}>
      <img src={img} alt={`game${id}`} onLoad={() => setLoaded(true)}/>
      {!loaded && 
        <div id="loadImage">
          <SpinnerLoading/>
        </div>
      }
      <div id="info">
        <div id="left">
          <h3 id="title">{name}</h3>
          <div id="genres">
            {genres.map((g,i) =>
              <span key={i}>{g.name}</span>
            )}
          </div>
        </div>
        <div id="rating">
          <i className='fas fa-star'/>
          <p>{rating}</p>
        </div>
      </div>
    </Link>
  )
}

export default Game;
