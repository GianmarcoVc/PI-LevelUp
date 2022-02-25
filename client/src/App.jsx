import store from './redux/store';
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar';
import Landing from './containers/Landing/Landing';
import Games from './containers/Games/Games';
import DetailGame from './containers/DetailGame/DetailGame';
import CreateGame from './containers/CreateGame/CreateGame';
import NotFound from './components/NotFound/NotFound';
import About from './containers/About/About';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>} >
            <Route index element={<Landing/>} />
            <Route path="games" element={<Games/>}/>
            <Route path="game/:idGame" element={<DetailGame/>}  />
            <Route path="create" element={<CreateGame/>}/>
            <Route path="about" element={<About/>} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
