import { useState } from 'react';
import { AnimatedTag } from '../tag-name';
import { HiOutlineShare } from 'react-icons/hi';
import '../card-dark/index.scss';
import './style.scss';
import { AddButton } from './components/add-button';

export function Share(props) {
  var [ isShow, setIsShow ] = useState(true);
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__label--main">Share</div>
        <HiOutlineShare style={{ color: '#8b8894', fontSize: '19px' }} />
      </div>
      <div className="card__body">
        <div className="card__row card__row--tags-group">
          <AnimatedTag
            isShow={isShow}
            onClose={() => setIsShow(p => !p)}
          ></AnimatedTag>
          <AddButton />
        </div>
      </div>
      <div className="card__footer">
        <div className="card__row">
          <div className="buttons-group">
            <button
              className="card__button card__button--cancel"
            >Cancel</button>
            <button className="card__button" onClick={() => setIsShow(p => !p)}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}