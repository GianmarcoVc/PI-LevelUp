import './LoadingGame.scss';
import Gif from '../../assets/loading/game.gif'

const LoadingGame = () => {
  return (
    <div id='loadGame'>
      <img src={Gif} alt='Loading...'/>
      <h3>Loading...</h3>
    </div>
  )
};

export default LoadingGame;
