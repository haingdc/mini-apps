import { AiOutlinePlus } from 'react-icons/ai';
import './style.scss';

export function AddButton(props) {
  return (
    <div
      className="button--add"
      style={{
        backgroundColor: '#4d4b52d',
        width: '30px',
        height: '30px',
      }}>
      <AiOutlinePlus  />
    </div>
  );
}