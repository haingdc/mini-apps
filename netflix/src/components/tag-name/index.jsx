import { GrClose as CloseIco } from 'react-icons/gr';
import './index.scss';

export function Tag(props) {
  return (
    <div className="tag">
      <div className="tag__avatar">A</div>
      <div className="tag__name">Arnold Jamal</div>
      <div className="tag__close">
        <CloseIco />
      </div>
    </div>
  );
}