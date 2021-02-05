import { AiOutlinePlus } from 'react-icons/ai';
import './style.scss';

export function AddButton(props) {
  const { isShowInput, onAdd, value, setValue } = props;
  return (
    <div className="add-button-wrapper">
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
      <div
        className="button--add"
        style={{
          backgroundColor: '#4d4b52d',
          width: '30px',
          height: '30px',
        }}>
        <AiOutlinePlus  />
      </div>
    </div>
  );
}