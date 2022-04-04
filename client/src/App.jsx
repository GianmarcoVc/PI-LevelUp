import store from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.scss'
import { Navbar, NotFound } from './components'
import { Landing, Games, DetailGame, CreateGame, About } from './containers'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Landing />} />
          <Route path='games' element={<Games />} />
          <Route path='game/:idGame' element={<DetailGame />} />
          <Route path='create' element={<CreateGame />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)

export default App
