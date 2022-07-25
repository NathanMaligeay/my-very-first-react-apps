import { useState } from "react";
import './App.scss';


const App = () => {

  const [input, setInput] = useState('')
  const [result, setResult] = useState('0')
  const [storedValue, setStoredValue] = useState('0')
  const [justCalculated, setJustCalculated] = useState(false)
  const [globCalc, setGlobCalc] = useState(false)

  const operatorArray = ['*', '+', '-', '/']

  const onClick = (e) => {
    if (!justCalculated) {
      setInput(input.concat(e))
    }
    else {
      if (operatorArray.includes(e)) {
        setGlobCalc(true)
        setJustCalculated(false)
        setStoredValue(result)
        setInput(e)
      }
      else {
        setGlobCalc(false)
        setStoredValue('0')
        setJustCalculated(false)
        setInput(e)
      }
    }
  }


  const calculate = () => {
    setJustCalculated(true)
    if (!globCalc) {
      setResult(eval(input).toString())
    }
    else {
      setJustCalculated(true)
      setStoredValue(eval(storedValue.concat(input)).toString())
      setResult(eval(storedValue.concat(input)).toString())
    }
  }

  const reset = () => {
    setInput('')
    setResult('0')
    setStoredValue('0')
    setJustCalculated(false)
    setGlobCalc(false)
  }

  return (
    <>
      <h1>Calculator App</h1>
      <div id='calculator'>
        <div id='screen'>
          <div id='input'>{globCalc && 'Rep'}{input}</div>
          <div id='result'><p>{result}</p></div>
        </div>
        <div id='buttons'>
          <div id='AC' onClick={reset}>AC</div>
          <div className="squared-button" onClick={() => onClick('/')}>/</div>
          <div className="squared-button" onClick={() => onClick('*')}>X</div>
          <div className="squared-button" onClick={() => onClick('7')}>7</div>
          <div className="squared-button" onClick={() => onClick('8')}>8</div>
          <div className="squared-button" onClick={() => onClick('9')}>9</div>
          <div className="squared-button" onClick={() => onClick('-')}>-</div>
          <div className="squared-button" onClick={() => onClick('4')}>4</div>
          <div className="squared-button" onClick={() => onClick('5')}>5</div>
          <div className="squared-button" onClick={() => onClick('6')}>6</div>
          <div className="squared-button" onClick={() => onClick('+')}>+</div>
          <div className="squared-button" onClick={() => onClick('1')}>1</div>
          <div className="squared-button" onClick={() => onClick('2')}>2</div>
          <div className="squared-button" onClick={() => onClick('3')}>3</div>
          <div id='equal' onClick={calculate}>=</div>
          <div id='zero' onClick={() => onClick('0')}>0</div>
          <div className="squared-button" onClick={() => onClick('.')}>.</div>
        </div>
      </div>
    </>
  )
}

export default App;