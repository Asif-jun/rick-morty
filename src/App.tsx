import { Route, Routes } from 'react-router'
import { Header } from './common/components/Header/Header'
import { CharacterPage } from './pages/CharacterPage/CharacterPage'
import { EpisodePage } from './pages/EpisodePage/EpisodePage'
import { HomePage } from './pages/HomePage/HomePage'
import { LocationPage } from './pages/LocationPage/LocationPage'
import { Character } from './pages/CharacterPage/Character'
import { NotFound } from './common/components/NotFound/NotFound'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/characters' element={<CharacterPage />} />
        <Route path='/characters/:id' element={<Character />} />
        <Route path='/locations' element={<LocationPage />} />
        <Route path='/episodes' element={<EpisodePage />} />
        <Route
          path='*'
          element={<NotFound message='Страница не найдена' />}
        />{' '}
      </Routes>
    </>
  )
}

export default App
