import "./board.css"

type TileProps = { value: string, click: any }

const Tile = ( { value, click } : TileProps) => {

    return (

        <button className="tile" onClick={ click }>

            <p className="val">{ value }</p>
            
        </button>

    )

}

export default Tile