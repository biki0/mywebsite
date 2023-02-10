import { useState } from "react"
import Heading from "../Heading"
import Tile from "./Tile"

import "./board.css"

const winningPosition = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
    [2, 5, 8],
    [1, 4, 7]
]

const TicTacToe = () => {

    const [board, boardUpdate] = useState<string[]>([]);
    const [player, setPlayer] = useState("X");
    const [xWon, setXWon] = useState(false);
    const [oWon, setOWon] = useState(false);

    const checkWinner = () => {

        for(let [x,y,z] of winningPosition){
            
            if(board[x] == board[y] && board[x] == board[z]){
                return board[x];
            }
        
        }
        
        return "";

    }

    const tileClicked = ( position: number ) => {
        
        if(board[position] == 'X' || board[position] == 'O') { return }

        board[position] = player === "X" ? "X" : "O";

        boardUpdate(board);

        setPlayer(player === "X" ? "O" : "X");

        setXWon("X" === checkWinner());
        setOWon("O" === checkWinner());

    }

    const reset = () => {

        boardUpdate([]);
        setPlayer("X"); 
        setXWon(false);
        setOWon(false);
    
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

            {xWon &&

                <>
                    <div className="end-message">
                        <p>Player X won</p>
                    </div>
                    <button className="reset-button" onClick={ reset }>Play Again</button>
                </>
            }

            {oWon &&

                <>
                    <div className="end-message">
                        <p>Player O won </p>
                    </div>
                    <button className="reset-button" onClick={ reset }>Play Again</button>
                </>
            }

        </>
        
    )

}

export default TicTacToe