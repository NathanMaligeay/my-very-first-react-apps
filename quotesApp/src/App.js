import './App.scss';
import { useState } from 'react';
import { quotesAndAuthor, colorList, generateRandom } from './appConstants';

const App = () => {
  const [quotesRandom, setQuotesRandom] = useState(generateRandom())
  const [colorRandom, setColorRandom] = useState(generateRandom(colorList.length))

  const newRandom = () => {
    let nextQuotesRandom = generateRandom()
    let nextColorRandom = generateRandom(colorList.length)
    do {
      nextQuotesRandom = generateRandom();
      nextColorRandom = generateRandom(colorList.length);
    } while (nextQuotesRandom === quotesRandom || nextColorRandom === colorRandom)

    setQuotesRandom(nextQuotesRandom)
    setColorRandom(nextColorRandom)
  }

  const handleClick = () => {
    newRandom()
  }

  const color = colorList[colorRandom]

  return (
    <div style={{ backgroundColor: color }} id='root'>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
      <h1>Random quote generator</h1>
      <div id='quote-box'>
        <q id='text' style={{ color: color }}>{quotesAndAuthor.quotes[quotesRandom]}</q>
        <p id='author'>- {quotesAndAuthor.author[quotesRandom]}</p>
        <div className='flex'>
          <div className='container' style={{ backgroundColor: color }}>
            <a id='tweet-quote' href="twitter.com/intent/tweet" target='_blank' title='Tweet this quote!'><i id='twitter-logo' className='fab fa-twitter'></i></a>
          </div>
          <div className='container' style={{ backgroundColor: color }}>
            <a id="tumblr-quote" href='https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes' title="Post this quote on tumblr!" target="_blank" rel="noreferrer"><i id='tumblr-logo' className="fab fa-tumblr"></i></a>
          </div>
        </div>
        <button id='newquote' style={{ backgroundColor: color, cursor: 'pointer' }} onClick={handleClick}>New quote</button>
      </div>
    </div>
  )
}

export default App;
