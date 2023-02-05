import {Routes, Route} from "react-router-dom"

import Home from "./components/Home" 
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SnakeGame from "./components/SnakeGame"
import TicTacToe from "./components/TicTacToe/TicTacToe"
import BinDecConverter from "./components/BinaryDecimalConverter/BinDecConverter"

function App() {
  

  return (
  
  <>
  
    
    <Navbar />

    <Routes>

      <Route path="/" element={ <Home /> } />
      <Route path="/snakegame" element={ <SnakeGame /> } />
      <Route path="/tictactoe" element={ <TicTacToe /> } />
      <Route path="bindec" element={ <BinDecConverter /> } />

    </Routes>


    <Footer info="Just learning random things!!!" />
  
  </>
  
  )

}

export default App
