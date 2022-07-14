import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard'
const cardImages = [
  { 'src': `${process.env.PUBLIC_URL}/img/helmet-1.png`, matched: false },
  { 'src': `${process.env.PUBLIC_URL}/img/potion-1.png`, matched: false },
  { 'src': `${process.env.PUBLIC_URL}/img/ring-1.png`, matched: false },
  { 'src': `${process.env.PUBLIC_URL}/img/scroll-1.png`, matched: false },
  { 'src': `${process.env.PUBLIC_URL}/img/shield-1.png`, matched: false },
  { 'src': `${process.env.PUBLIC_URL}/img/sword-1.png`, matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(null)

  //shuffle cards
  const shuffleCards = () => {
    const shiffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)//use sort to shuuflle moosic!
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shiffleCards)
    setTurns(0)
  }

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      let x = choiceOne.src === choiceTwo.src ? 'Same' : 'Diff'

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
      }
      console.log(x)
      setTimeout(() => resetTurn(), 1000)
    }
  }, [choiceOne, choiceTwo, turns])

  // console.log(cards)
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(a => a + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>MATCH</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="turns">Turns: {turns}</div>

      <div className="card-grid">
        {cards.map(card =>
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
}

export default App;
