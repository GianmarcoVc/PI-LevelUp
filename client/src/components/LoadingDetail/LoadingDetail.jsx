import './LoadingDetail.scss'
import Gif from '../../assets/loading/detail.gif'

const LoadingDetail = () => {
  return (
    <div id='loadingDetail'>
      <img src={Gif} alt='Loading Game..'/>
      <h2>Loading the game ...</h2>
    </div>
  )
};

export default LoadingDetail;
