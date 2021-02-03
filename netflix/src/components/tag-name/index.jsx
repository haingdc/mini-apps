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
  var { isShow, onClose } = props;
  var transitions = useTransition(!!isShow, {
    config: isShow ? { ...config.stiff } : { duration: 150 },
    from : { opacity: 0, transform: `translate3d(10px, 0px, 0px)` },
    enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(10px, 0px, 0px)` },
  });
  return transitions(
    (styles, isShow) => {
      return isShow && (
        <animated.div class="tag-wrapper" style={{ ...styles }}>
          <Tag avatar="A" name="Arnold Jamal" onClose={onClose} />
        </animated.div>
      )
    }
  );
}