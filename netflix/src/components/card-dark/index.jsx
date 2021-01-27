import './index.scss';
export default function CardDark() {
  return (
    <div className="card-dark">
      <div className="card-dark__label--main">Create an Event</div>
      <input type="text" className="card-dark__title" placeholder="Title" value="Drink a capuchino" />
      <div className="card-dark__row">
        <div className="card-dark__label card-dark__row__label">Color</div>
        <div className="card-dark__row__colors">
          <input name="color" type="radio" value="red" />
          <input name="color" type="radio" value="orange"/>
          <input name="color" type="radio" value="yellow"/>
          <input name="color" type="radio" value="green"/>
          <input name="color" type="radio" value="blue"/>
          <input name="color" type="radio" value="purple"/>
        </div>
      </div>
    </div>
  );
}