import { Route, Routes } from 'react-router'
import { Header } from './common/components/header/Header'
import { CharacterPage } from './pages/character/CharacterPage'
import { EpisodePage } from './pages/episode/EpisodePage'
import { HomePage } from './pages/home/HomePage'
import { LocationPage } from './pages/location/LocationPage'
import { Character } from './pages/character/Character'
import { NotFound } from './common/components/notFound/NotFound'

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
