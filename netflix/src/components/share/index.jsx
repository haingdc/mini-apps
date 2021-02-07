import React, { useState, useRef } from 'react';
import { Tag } from '../tag-name';
import { HiOutlineShare } from 'react-icons/hi';
import '../card-dark/index.scss';
import './style.scss';
import { AddButton } from './components/add-button';
import { animated, config, useTransition } from 'react-spring';

export function Share(props) {
  var [ isShow, setIsShow ] = useState(true);
  var [ value, setValue ] = useState('');
  var [ isShowInput, setShowInput ] = useState(true);
  var uiReady = useRef(false);

  var [listTag, setListTag] = useState([
    { id: '@001', name: 'Arnold Jamal', avatar: 'A' },
    { id: '@002', name: 'Tet Chicken', avatar: 'C' },
    { id: '@003', name: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff', avatar: 'W' },
  ]);
  function addTag(name) {
    var tag = { id: generateId(), name, avatar: name[0].toUpperCase() };
    setListTag(list => ([...list, tag]));
  }

    var resultTransition = useTransition(listTag, {
    config: { ...config.stiff },
    from : { opacity: 0, transform: `translate3d(10px, 0px, 0px)` },
    enter: { opacity: 1, transform: `translate3d( 0px, 0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(10px, 0px, 0px)` },
    immediate: !uiReady.current,
    onRest() {
      uiReady.current = true;
    },
  });
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
              listTag.length
              ? (
                  <>
                    {resultTransition((styles, item) => {
                      var { id, name, avatar } = item;
                      return (
                        <animated.div style={styles}>
                          <Tag
                            key={item.id}
                            id={id}
                            name={name}
                            avatar={avatar}
                            isShow={isShow}
                            onClose={() => {
                              var newList = listTag.filter(n => n !== item);
                              setListTag( newList )
                            }}
                          ></Tag>
                        </animated.div>
                      );
                    })}
                    <AddButton isShowInput={isShowInput} onClick={() => setShowInput(v => !v)} onAdd={addTag} value={value} setValue={setValue} />
                  </>
                )
              : undefined
            }
            {!listTag.length
              ? <AddButton isShowInput={isShowInput} onClick={() => setShowInput(v => !v)} onAdd={addTag} value={value} setValue={setValue} />
              : undefined
            }
        </div>
        <div className="card__row">
          <textarea name="message" placeholder="Enter your message"></textarea>
        </div>
        <div className="card__row card__row--notify">
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