import './LoadingGames.scss'

const LoadingGames = () => {

  let games = Array.from({length: 15}, () => Math.floor(Math.random() * 10)) 
  return (
    <div id='loadGames'>
      {games.map((g,i) =>
        <div key={i} className='game'>
          <div className="overlay"></div>
        </div>  
      )}
    </div>
  )
};

export default LoadingGames;
