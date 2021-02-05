import { useState } from 'react';
import { AnimatedTag } from '../tag-name';
import { HiOutlineShare } from 'react-icons/hi';
import '../card-dark/index.scss';
import './style.scss';
import { AddButton } from './components/add-button';

export function Share(props) {
  var [ isShow, setIsShow ] = useState(true);
  var [ isShowInput, setShowInput ] = useState(false);
  var [listTag, setListTag] = useState([
    { id: '@001', name: 'Arnold Jamal', avatar: 'A' },
    { id: '@002', name: 'Tet Chicken', avatar: 'C' },
    { id: '@003', name: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff', avatar: 'W' },
  ]);
  function addTag(name) {
    var tag = { id: generateId(), name, avatar: name[0] };
    setListTag(list => ([...list, tag]));
  }
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__label--main">Share</div>
        <HiOutlineShare style={{
          color: '#8b8894',
          fontSize: '28px',
          borderRadius: '50%',
          backgroundColor: '#555459',
          padding: '6px',
        }} />
      </div>
      <div className="card__body">
        <div className="card__row card__row--tags-group">
            {
              listTag.length ?
                listTag.map((item, i, list) => {
                  var { id, name, avatar } = item;
                  var Tag = (
                    <AnimatedTag
                      id={id}
                      name={name}
                      avatar={avatar}
                      isShow={isShow}
                      onClose={() => {
                        var newList = listTag.filter(n => n !== item);
                        setListTag( newList )
                      }}
                    ></AnimatedTag>
                  );
                  if (i === list.length - 1) {
                    return (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} key={id}>
                        {Tag}
                        <AddButton isShowInput={isShowInput} onAdd={addTag} />
                      </div>
                    );
                  }
                  return Tag;
                }) : <AddButton isShowInput={isShowInput} onAdd={addTag} />
            }
        </div>
        <div className="card__row">
          <textarea name="message" placeholder="Enter your message"></textarea>
        </div>
        <div className="card__row">
          <input type="checkbox" name="notify" value="true" />
          <label htmlFor="notify"> Notify people</label>
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

function generateId() {
  return Array.from({ length: 10 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
}