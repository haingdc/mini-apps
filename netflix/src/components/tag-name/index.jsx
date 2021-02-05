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

export function AnimatedTag(props) {
  var uiReady = useRef(false);
  var { isShow, onClose, avatar, name } = props;
  var transitions = useTransition(!!isShow, {
    config: isShow ? { ...config.stiff } : { duration: 150 },
    from : { opacity: 0, transform: `translate3d(10px, 0px, 0px)` },
    enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(10px, 0px, 0px)` },
    immediate: !uiReady.current,
    onRest() {
      uiReady.current = true;
    },
  });
  return transitions(
    (styles, isShow) => {
      return isShow && (
        <animated.div className="tag-wrapper" style={{ ...styles }}>
          <Tag avatar={avatar} name={name} onClose={onClose} />
        </animated.div>
      )
    }
  );
}