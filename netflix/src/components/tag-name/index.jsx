import {} from 'react'
import { animated, config, useTransition } from 'react-spring';
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

export function AnimatedTag(props) {
  var { isShow, setHide } = props;
  var transitions = useTransition(!!isShow, {
    config: { ...config.stiff },
    from : { opacity: 0, transform: `translate3d(0px, -10px, 0px)` },
    enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(0px, 10px, 0px)` },
  });
  return transitions(
    (styles, isShow) =>
      isShow && (
        <animated.div { ...styles }>
          <Tag />
        </animated.div>
      )
  );
}