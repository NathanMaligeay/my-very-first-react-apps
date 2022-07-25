import './App.scss';
import { useEffect, useState } from 'react';

// child component qui sert à l'affichage des boutons d'incrémentation
const Button = (props) => {
  const { method, value } = props
  
  return (
    <button onClick={() => method(value)}>{value == 1 ? '+' + value : value}</button>
  )
}


// pq obligé de passer props et faire const timeleft = props et pas passer direct la méthode ?
// child component qui sert à l'affichage du timer
const Timer = (props) => {
  const { timeLeft } = props
  let minute = Math.floor(timeLeft / 60)
  let second = timeLeft - (minute * 60)

  return (
    <div>{minute < 10 ? '0' + minute : minute} : {second < 10 ? '0' + second : second}</div>
  )
}

//child component gérant le stockage du temps de travail total sur plusieurs jours (server side normalement) 
const TotalTime = (props) => {
  const [totalTime, setTotalTime] = useState(0)
  // const [totalArray, setTotalArray] = useState([])
  const { timeRemaining, isSession, ticking } = props

  // let date = new Date()
  let hourTotal = Math.floor(totalTime / 3600)
  let minuteTotal = Math.floor(totalTime/60) - (hourTotal * 60)
  let secondTotal = totalTime - (minuteTotal * 60 + hourTotal * 3600)

  useEffect(() => {
    if (isSession && ticking == true) {
      setTotalTime(totalTime => totalTime + 1)
    }
  }, [timeRemaining]);

  // const handleClickTotalTimeReset = () => {
  //   if (totalTime != 0) { setTotalArray([...totalArray, totalTime]) }
  //   setTotalTime(0)
  // }

  return (
    <>
      <div>You've worked for {hourTotal < 10 ? '0' + hourTotal : hourTotal } : {minuteTotal < 10 ? '0' + minuteTotal : minuteTotal} : {secondTotal < 10 ? '0' + secondTotal : secondTotal} during this session</div>
      {/* <ul>{totalArray.map(time => <li key={totalArray.indexOf(time)}>{date.getDate()}/{date.getMonth()} {time}</li>)}</ul> */}
      {/* <button onClick={handleClickTotalTimeReset}>Save my working time!</button> */}
    </>
  )
}

const App = () => {
  const [ticking, setTicking] = useState(false)
  const [sessionLength, setSessionLength] = useState(25)
  const [breakLength, setBreakLength] = useState(5)
  const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60)
  const [isSession, setIsSession] = useState(true)
  const [intervalFunc, setIntervalFunc] = useState()

  // méthodes qui gèrent l'incrémentation des valeurs de session et break
  const handleClickSession = (value) => {
    if (value == -1 && sessionLength > 1) {
      setSessionLength(sessionLength + value)
    } else if (value == 1) {
      setSessionLength(sessionLength + value)
    }
  }

  const handleClickBreak = (value) => {
    if (value == -1 && breakLength > 1) {
      setBreakLength(breakLength + value)
    } else if (value == 1) {
      setBreakLength(breakLength + value)
    }
  }

  // mets la bonne valeur de départ pour le timer quand on incrémente la session length 
  useEffect(() => {
    setTimeRemaining(sessionLength * 60);
  }, [sessionLength])

  // méthode qui switch le time remaining entre la sessionlength et la break length
  const switchTimer = () => {
    if (isSession) {
      setIsSession(!isSession)
      setTimeRemaining(breakLength * 60)
      new Audio('https://lasonotheque.org/UPLOAD/mp3/2647.mp3').play() //ne marche pas sur mobile sadge (faut set des controls mais pas compris)
      setTimeout(() => {
        setTicking(true)
      }, 3000);
    } else {
      setIsSession(!isSession)
      setTimeRemaining(sessionLength * 60)
      new Audio('https://lasonotheque.org/UPLOAD/mp3/2647.mp3').play()
      setTimeout(() => {
        setTicking(true)
      }, 3000);
    }
  }

  // arrête le ticking du compteur et passe de la session length à la breaklength et viceversa
  useEffect(() => {
    if (timeRemaining === 0) {
      setTicking(false)
      setTimeout(switchTimer, 1000);
    }
  }, [timeRemaining])




  // timeur qui décrémente de 1 seconde le time remaining
  useEffect(() => {
    if (ticking) {
      setIntervalFunc(setInterval(() => {
        setTimeRemaining(timeRemaining => timeRemaining - 1)
      }
        , 1000))
    } else {
      clearInterval(intervalFunc)
    }
  }, [ticking])

  // methode permettant de mettre en play ou pause le compteur
  const handleClickPlay = () => setTicking(!ticking)


  // est ce qu'il existe une commande pour remettre les default state au lieu de refaire à la main genre setDefaultState(timeRemaining, ticking, isSession)
  const handleClickReset = () => {
    clearInterval(intervalFunc)
    setTimeRemaining(sessionLength * 60)
    setTicking(false)
    setIsSession(true)
  }

  return (
    <div className='globCont'>
      <h1>POMODORO CLOCK</h1>
      <div id='increment-container'>
        <div id='session'>
          <p>SESSION LENGTH</p>
          <div className='time-display'>{sessionLength} : 00</div>
          <div className='flexbox'>
            <Button method={handleClickSession} value={1}></Button>
            <Button method={handleClickSession} value={-1}></Button>
          </div>
        </div>
        <div id='break'>
          <p>BREAK LENGTH</p>
          <div className='time-display'>{breakLength} : 00</div>
          <div className='flexbox'>
            <Button method={handleClickBreak} value={1}></Button>
            <Button method={handleClickBreak} value={-1}></Button>
          </div>
        </div>
      </div>
      <div id='timer'>
        <p>TIMER</p>
        <Timer className='time-display' timeLeft={timeRemaining}></Timer>
      </div>
      <div id='buttons'>
        <button onClick={() => handleClickPlay()}>play/pause</button>
        <button onClick={() => handleClickReset()}>reset</button>
      </div>
      <div id='idk-how-to-style-child-component'>
        <TotalTime timeRemaining={timeRemaining} isSession={isSession} ticking={ticking} id='idk-how-to-style-child-component'></TotalTime>
      </div>
    </div>
  )
}

export default App;
