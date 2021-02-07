import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import './style.scss';

export function AddButton(props) {
  const { isShowInput, onClick, onAdd, value, setValue } = props;
  return (
    <div className="add-button-wrapper">
      {isShowInput
        ? (
          <textarea
            rows="1"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="false"
            spellCheck="false"
            className="tag__input"
            onKeyPress={(event) => {
              var key = window.event.keyCode;
              if (key === 13 && event.target.value !== '') {
                event.preventDefault();
                setValue('');
                onAdd(event.target.value);
              }
            }}
            onChange={event => setValue(event.target.value)}
            value={value}
          />
        )
        : undefined
      }
      <div className="button--add" onClick={onClick}>
        <AiOutlinePlus  />
      </div>
    </div>
  );
}