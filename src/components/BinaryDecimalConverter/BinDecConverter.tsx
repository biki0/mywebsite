import { useState } from "react"
import Heading from "../Heading";
import "./bindec.css"

const BinDecConverter = () => {

    const [userInput, setUserInput] = useState("0");
    const [switchMode, setSwitchMode] = useState(false);
    let invalidInput: boolean = false;
    let result: number = 0;
    let showResult: boolean = false;

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value)
    }
    const clearInput = () => {
        setUserInput("");
    }

    const modeButton = () => {
        setSwitchMode(!switchMode);
    }

    const checkBinaryInput = () => {
        for(let i=0; i<userInput.length; ++i){
            if(userInput.length > 0 && userInput[i] !== "0" && userInput[i] !== "1"){
                invalidInput = true;
            }
        }
    }

    const toDecimal = () => {
        result = parseInt(userInput, 2);
        showResult = result >= 0;
    }

    const checkDecimalInput = () => {
        if(userInput.length > 0 && userInput.match(/[^0-9]/)){
            invalidInput = true;
        }
    }

    const toBinary = () => {
        result = +Number(userInput).toString(2);
        showResult = result >= 0;
    }
    

    if (switchMode == false) {
        
        checkBinaryInput();
        toDecimal();

        return (

            <>

                <Heading title="Binary to Decimal" />
        
                
                {invalidInput && <div className="invalid-info">Invalid input! Enter 0 or 1</div>}
                {showResult && <div className="result">{result}</div>}

                <input type="text" value={userInput} onClick={clearInput} onChange={handleInput} />

                <button className="change-button" onClick={modeButton}>Decimal to Binary</button>
                
                
            </>
    )} 
    else {

        checkDecimalInput();
        toBinary();

        return (
            
            <>

                <Heading title="Decimal to Binary" />
        
                
                {invalidInput && <div className="invalid-info">Invalid input! Enter numbers only</div>}
                {showResult && <div className="result">{result}</div>}

                <input type="text" value={userInput} onClick={clearInput} onChange={handleInput} />

                <button className="change-button" onClick={modeButton}>Binary to Decimal</button>
                
            
            </>
    
        )
    }


}

export default BinDecConverter