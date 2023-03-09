import Heading from "./Heading"
import CSS from 'csstype'

const h1Style: CSS.Properties = {

    fontSize: "3rem"

}

const Navbar = () => {


    return (
    
        <div>

                <h1 style={h1Style}><a href="/"> Home </a></h1>
             
        </div>
        
    )

}

export default Navbar