import { Routes, Route } from "react-router-dom"

import Home from "./components/Home" 
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SnakeGame from "./components/SnakeGame/SnakeGame"
import TicTacToe from "./components/TicTacToe/TicTacToe"
import BinDecConverter from "./components/Converter/BinDecConverter"
import FixedPoint from "./components/Converter/FixedPoint"

function App() {
  

  return (
  
  <>
  
    
    <Navbar />

    <Routes>

      <Route path="/" element = { <Home /> } />
      <Route path="/snakegame" element = { <SnakeGame /> } />
      <Route path="/tictactoe" element = { <TicTacToe /> } />
      <Route path="bindec" element = { <BinDecConverter /> } />
      <Route path="fixedpoint" element= { <FixedPoint /> } />

    </Routes>


    <Footer info="BBBBBBBBBBBBBBBBBBBBBBBBBBBBB#8813" />
  
  </>
  
  )

}

export default App
