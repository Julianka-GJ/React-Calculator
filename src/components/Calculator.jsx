import { useState } from "react";
import "./Calculator.scss";


function Calculator() {

const [result, setResult] = useState("");
const [firstNumber, setFirstNumber] = useState("");
const [secondNumber, setSecondNumber] = useState("");
const [operat, setOperat] = useState("");

const handleClick = (value)=> {
   setResult(result + value.target.name);

   if (result) {
        if (Number.isInteger(+result) && (result + value.target.name).indexOf("0") === 0) {
            setResult((result + value.target.name).slice(1)); 
        }
   }

    if (firstNumber && operat) {
        setSecondNumber(secondNumber + value.target.name);

        if (secondNumber) {
            if (Number.isInteger(+secondNumber) && (secondNumber + value.target.name).indexOf("0") === 0) {
                setResult(firstNumber + operat + (secondNumber + value.target.name).slice(1));
                setSecondNumber((secondNumber + value.target.name).slice(1));
            }
        }
    }
};

const clearOperations = () => {
    setResult("");
    setFirstNumber("");
    setSecondNumber("");
    setOperat("");
};

const deleteOperations = () => {
    setResult(result.slice(0, result.length-1));
    if (result.length === 1) {
    };
};


const operatorClick = (oper) => {     
    if (operat) {
        setFirstNumber(calc(+firstNumber, +secondNumber, operat));
        setResult(calc(+firstNumber, +secondNumber, operat) + oper.target.name);
        setOperat(oper.target.name);
        setSecondNumber("");
    }

    else if (!result) {
        setResult("");
    }

   else {
        setFirstNumber(result);
        setOperat(oper.target.name);
        setResult(result + oper.target.name);
   }
};

const equalsClick = () => {
    if (firstNumber && secondNumber && operat) {
        setResult(calc(+firstNumber, +secondNumber, operat));
    }
};

const sqrtClick = () => {
    if (!result) {
        setResult("");
    }

    else if (operat) {
        setResult(result);
    }

    else {
        setResult(Math.sqrt(+result));
    }
};

const pointClick = (poin) => {
    if (result) {
        if (result.indexOf(".") === -1) {
            setResult(result + poin.target.name);
        }

        else {
            setResult(result);
            }
    }

    else {  
       setResult("");
    }

    if (secondNumber) {
        if (secondNumber.indexOf(".") === -1) {
            setResult(result + poin.target.name);
            setSecondNumber(secondNumber + poin.target.name);
        } 
    
        else {
            setSecondNumber(secondNumber);
        }
    }    
    else {  
        setSecondNumber("");
     }
};

const calc = (firstNumber, secondNumber, operat) => {
    let resultCalc;
    switch (operat) {
        case '+':
            resultCalc = firstNumber + secondNumber;
            break;
        case '-':
            resultCalc = firstNumber - secondNumber;
            break;
        case '*':
            resultCalc = firstNumber * secondNumber;
            break;
        case '/':
            if (secondNumber === 0) {
                resultCalc = "You can't divide by zero";
            }
            else {
                resultCalc = firstNumber / secondNumber; 
            }
          break;
        case '%':
            resultCalc = (firstNumber/100) * secondNumber;
            break;
        case '√':
            resultCalc = Math.sqrt(firstNumber);
            break;
        case '^':
            resultCalc = Math.pow(firstNumber, secondNumber);
            break;
      }
      return resultCalc;
    };


    return (
        <div className="calculator">
            <div className="entry-field">
                <input type="text" defaultValue={result}></input>
                <input className="operandi" type="text" defaultValue={firstNumber}></input>
                <input className="operandi" type="text" defaultValue={operat}></input>
                <input className="operandi" type="text" defaultValue={secondNumber}></input>
            </div>
            <div className="keyboard">
                <button onClick={clearOperations} className="button-number clear">Clear</button>
                <button onClick={deleteOperations} className="button-number delete">CE</button>

                <button onClick={handleClick} className="button-number" name="1">1</button>
                <button onClick={handleClick} className="button-number" name="2">2</button>
                <button onClick={operatorClick} className="button-number" name="+">+</button>

                <button onClick={handleClick} className="button-number" name="3">3</button>
                <button onClick={handleClick} className="button-number" name="4">4</button>
                <button onClick={operatorClick} className="button-number" name="-">-</button>

                <button onClick={handleClick} className="button-number" name="5">5</button>
                <button onClick={handleClick} className="button-number" name="6">6</button>
                <button onClick={operatorClick} className="button-number" name="*">×</button>

                <button onClick={handleClick} className="button-number" name="7">7</button>
                <button onClick={handleClick} className="button-number" name="8">8</button>
                <button onClick={operatorClick} className="button-number" name="/">/</button>

                <button onClick={handleClick} className="button-number" name="9">9</button>
                <button onClick={handleClick} className="button-number" name="0">0</button>
                <button onClick={sqrtClick} className="button-number" name="√">√</button>

                <button onClick={pointClick} className="button-number" name=".">.</button>
                <button onClick={operatorClick} className="button-number" name="^">^</button>
                <button onClick={operatorClick} className="button-number" name="%">%</button>
                
                <button onClick={equalsClick} className="button-number result">=</button>
            </div>
        </div>
    )
}

export default Calculator;