import './index.scss';
export default function CardDark() {
  return (
    <div className="card-dark">
      <div className="card-dark__label--main">Create an Event</div>
      <input type="text" className="card-dark__title" placeholder="Title" value="Drink a capuchino" />
      <div className="card-dark__row">
        <div className="card-dark__label card-dark__row__label">Color</div>
        <div className="card-dark__row__colors">
          <label class="container">
            <input name="color" type="radio" value="red" />
            <span class="checkmark"></span>
          </label>
          <label className="container">
            <input name="color" type="radio" value="orange"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">
            <input name="color" type="radio" value="yellow"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">
            <input name="color" type="radio" value="green"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">
            <input name="color" type="radio" value="blue"/>
            <span className="checkmark"></span>
          </label>
          <label className="container">
            <input name="color" type="radio" value="purple"/>
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  );
}