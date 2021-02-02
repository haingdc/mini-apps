import { Tag } from '../tag-name';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { HiOutlineShare } from 'react-icons/hi';
import '../card-dark/index.scss';

export function Share(props) {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__label--main">Share</div>
        <HiOutlineShare style={{ color: '#8b8894', fontSize: '19px' }} />
      </div>
      <div className="card__body">
        <div className="card__row">
          <Tag></Tag>
        </div>
      </div>
      <div className="card__footer">
        <div className="card__row">
          <div className="buttons-group">
            <button
              className="card__button card__button--cancel"
            >Cancel</button>
            <button className="card__button">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}