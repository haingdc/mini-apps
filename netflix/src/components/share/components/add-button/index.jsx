import { AiOutlinePlus } from 'react-icons/ai';
import './style.scss';

export function AddButton(props) {
  const { isShowInput, onAdd } = props;
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
            onAdd(event.target.value);
          }
        }}
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