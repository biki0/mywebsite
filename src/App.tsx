import {Routes, Route} from "react-router-dom"

import Home from "./components/Home" 
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SnakeGame from "./components/SnakeGame"


function App() {
  
  
  
  
  return (
  
  <>
  
    
    <Navbar />

    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/snakegame" element={<SnakeGame/>} />

    </Routes>




    <Footer info="Play bad games with bugs. Most games created in C++" />
  
  </>
  
  )

}

export default App
