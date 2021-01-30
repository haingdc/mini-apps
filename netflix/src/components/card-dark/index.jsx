import { IoCheckmarkOutline } from 'react-icons/io5';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { CgNotes } from 'react-icons/cg'
import "./styles/reach-modal-overrides.scss";
import './index.scss';

export default function CardDark() {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__label--main">Create an Event</div>
        <CgNotes style={{ color: '#8b8894', fontSize: '19px' }} />
      </div>
      <div className="card__body">
        <div className="card__row">
          <input type="text" className="card__title" placeholder="Title" value="Drink a capuchino" />
        </div>
        <div className="card__row">
          <div className="card__label card__row__label">Color</div>
          <div className="card__row__colors">
            <label className="container">
              <input name="color" type="radio" value="red" />
              <span className="checkmark">
                <IoCheckmarkOutline className="checkmark__ico" />
              </span>
            </label>
            <label className="container">
              <input name="color" type="radio" value="orange"/>
              <span className="checkmark">
                <IoCheckmarkOutline className="checkmark__ico" />
              </span>
            </label>
            <label className="container">
              <input name="color" type="radio" value="yellow"/>
              <span className="checkmark">
                <IoCheckmarkOutline className="checkmark__ico" />
              </span>
            </label>
            <label className="container">
              <input name="color" type="radio" value="green"/>
              <span className="checkmark">
                <IoCheckmarkOutline className="checkmark__ico" />
              </span>
            </label>
            <label className="container">
              <input name="color" type="radio" value="blue"/>
              <span className="checkmark">
                <IoCheckmarkOutline className="checkmark__ico" />
              </span>
            </label>
            <label className="container">
              <input name="color" type="radio" value="purple"/>
              <span className="checkmark">
                <IoCheckmarkOutline className="checkmark__ico" />
              </span>
            </label>
          </div>
        </div>
        <div className="card__row">
          <div className="card__label card__row__label">Date</div>
        </div>
        <div className="card__row">
        <div className="card__date">
            <input type="date"/>
          </div>
        </div>
        <div className="card__row card__row--time">
          <div className="card__time">
            <input type="time"/>
          </div>
          <div className="card__time">
            <input type="time"/>
          </div>
        </div>
      </div>
      <div className="card__footer">
        <div className="card__row">
          <div className="buttons-group">
            <button className="card__button card__button--cancel">Cancel</button>
            <button className="card__button">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Modal(props) {
  var { isOpen, onHide, style = {
    maxWidth: '328px',
    padding: 0,
    borderRadius: 15,
    boxShadow: '-1px 2px 4px rgba(0,0,0,0.2), 1px -1px 4px rgba(0,0,0,0.2)',
  } } = props;

  return (
    isOpen && (
      <DialogOverlay
        allowPinchZoom={true}
        onDismiss={onHide}
        isOpen={isOpen}
      >
        <DialogContent
          style={{
            ...style,
          }}
        >
          <CardDark />
        </DialogContent>
      </DialogOverlay>
    )
  );
}