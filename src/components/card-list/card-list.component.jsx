import Card from '../card/card.component.jsx';
import './card-list.styles.css';

const CardList = ({ monsters }) => {
  return (
    <div className='card-list'>
      {
        monsters.map(monster => {
          return <Card monster={monster}/>
        })
      }
    </div>
  )
}

export default CardList;

/*
  React re-renders when:
    1. state obejct changes
    2. props change
*/