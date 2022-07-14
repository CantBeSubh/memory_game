import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }
  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={card.src} alt='Front of Card' />
        <img className='back'
          src={`${process.env.PUBLIC_URL}/img/cover.png`}
          alt='Back of Card'
          onClick={handleClick}
        />
      </div>
    </div>
  )
}
