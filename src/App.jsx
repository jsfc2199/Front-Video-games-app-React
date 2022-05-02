import './App.css'
import Videogame from './components/Videogame'
import Header from './components/Header'
import AddGame from './components/AddGame'
import StoreProvider from './components/StoreProvider'
import Searchbar from './components/Searchbar'

function App() {

  return (
    <StoreProvider >
      <div className="displayContainer">
      <Header />
      <AddGame />
      <Searchbar />
      <Videogame />
      </div>
    </StoreProvider>
  )
}

export default App
