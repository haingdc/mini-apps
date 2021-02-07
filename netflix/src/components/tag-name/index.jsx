import { useRef } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { GrClose as CloseIco } from 'react-icons/gr';
import './index.scss';

export function Tag(props) {
  var { avatar, name, onClose } = props;
  return (
    <div className="tag">
      <div className="tag__avatar">{ avatar }</div>
      <div className="tag__name">{ name }</div>
      <div className="tag__close" onClick={onClose}>
        <CloseIco />
      </div>
    </div>
  );
}
