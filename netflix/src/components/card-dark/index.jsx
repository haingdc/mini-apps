import { IoCheckmarkOutline } from 'react-icons/io5';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { CgNotes } from 'react-icons/cg'
import { useTransition, config, animated } from 'react-spring';
import "./styles/reach-modal-overrides.scss";
import './index.scss';

export default function CardDark(props) {
  var { onHide, title, onChangeTitle } = props;
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__label--main">Create an Event</div>
        <CgNotes style={{ color: '#8b8894', fontSize: '19px' }} />
      </div>
      <div className="card__body">
        <div className="card__row">
          <input type="text" className="card__title" placeholder="Title" value={title} onChange={onChangeTitle} />
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
            <button
              className="card__button card__button--cancel"
              onClick={onHide}
            >Cancel</button>
            <button className="card__button">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

var AnimatedDialogOverlay = animated(DialogOverlay);
var AnimatedDialogContent = animated(DialogContent);

export function Modal(props) {
  var { isOpen, onHide, children } = props;

  var modalTransition = useTransition(!!isOpen, {
    config: isOpen ? { ...config.stiff } : { duration: 150 },
    from : { opacity: 0, transform: `translate3d(0px, -10px, 0px)` },
    enter: { opacity: 1, transform: `translate3d(0px,   0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(0px,  10px, 0px)` },
  });

  return modalTransition(
    (styles, isOpen ) => {
      return (
        isOpen && (
          <AnimatedDialogOverlay
            allowPinchZoom={true}
            onDismiss={onHide}
            isOpen={isOpen}
          >
            <AnimatedDialogContent
              aria-label="Content todo"
              style={{
                maxWidth: '328px',
                padding: 0,
                borderRadius: 15,
                boxShadow: '-1px 2px 4px rgba(0,0,0,0.2), 1px -1px 4px rgba(0,0,0,0.2)',
                ...styles,
              }}
            >
              {children}
            </AnimatedDialogContent>
          </AnimatedDialogOverlay>
        )
      );
    }
  );
}