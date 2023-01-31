import CSS from 'csstype'


type HeadingProps = { title: string }


const h1Style: CSS.Properties = {

    marginTop: "30px",
    marginRight: "30px"

}


const Heading = ( { title } : HeadingProps) => {

    return ( 

        <h1 style={h1Style}> { title } </h1> 
    
    )

}

export default Heading