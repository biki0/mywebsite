import Heading from "../Heading"
import CSS from 'csstype'

const dStyle: CSS.Properties = { marginLeft: "30px" }
const aStyle: CSS.Properties = {color: "red"}

const SnakeGame = () => {


    return (

        <>
            
            <Heading title="Snake Game" />

            <div> COMING SOON WHEN I FIGURE OUT HOW TO EMBED WASM WITH REACT TYPESCRIPT!!! </div>
            <div> For now play it on -&gt; <a target="_blank" style={aStyle} href="https://dbofficial.us/">HERE</a>. It was made with C++. </div>

            

            
        
        </>

    )
    
    

}

export default SnakeGame