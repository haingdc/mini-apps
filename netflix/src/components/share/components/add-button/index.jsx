import { AiOutlinePlus } from 'react-icons/ai';
import './style.scss';

export function AddButton(props) {
  const { isShowInput } = props;
  return (
    <>
      <textarea
        rows="1"
        cols="10"
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="false"
        spellCheck="false"
        class="tag__input"
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
    </>
  );
}