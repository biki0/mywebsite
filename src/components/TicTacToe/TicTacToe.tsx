import { useState } from "react"
import Heading from "../Heading"
import Tile from "./Tile"

import "./board.css"

const TicTacToe = () => {

    const [board, boardUpdate] = useState<string[]>([]);
    const [player, setPlayer] = useState(true);
    const [errorButton, setErrorButton] = useState(false);
    const [endMessage, setEndMessage] = useState(false);

    const checkWinner = () => {

        if(board[5] == 'X'){
            setErrorButton(true);
            setEndMessage(true);
        }

    }

    const tileClicked = ( position: number ) => {
        
        if(board[position] == 'X' || board[position] == 'O') { return }

        board[position] = player ? "X" : "O";

        boardUpdate(board);

        checkWinner();

        setPlayer(!player);

    }

    const reset = () => {

        setErrorButton(false);
        boardUpdate([]);
        setPlayer(true); 
        setEndMessage(false);
    
    }

    return (
        
        <>
            
            <Heading title="Tic Tac Toe" />
            

            <div className="board">

                <Tile value={ board[0] } click={ () => tileClicked(0) } />
                <Tile value={ board[1] } click={ () => tileClicked(1) } />
                <Tile value={ board[2] } click={ () => tileClicked(2) } />
                <Tile value={ board[3] } click={ () => tileClicked(3) } />
                <Tile value={ board[4] } click={ () => tileClicked(4) } />
                <Tile value={ board[5] } click={ () => tileClicked(5) } />
                <Tile value={ board[6] } click={ () => tileClicked(6) } />
                <Tile value={ board[7] } click={ () => tileClicked(7) } />
                <Tile value={ board[8] } click={ () => tileClicked(8) } />

            </div>

                
            {errorButton && 
                <button className="error-button" onClick={reset}>Play Again</button> 
            }    
            
            {endMessage &&
                <div className="end-message">
                    <p>GAME ENDED</p>
                </div>
            }

        </>
        
    )


}

export default TicTacToe