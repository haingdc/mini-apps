import React, { SFC, createContext, useRef, useMemo, useState } from "react";
import { useTransition, useSpring, config, animated } from "react-spring";
import { useHeight } from "./useHeight";

import { DialogOverlay, DialogContent } from "@reach/dialog";

import "./css/reach-modal-overrides.scss";



type ContextProps = {
  disable(): void;
  enable(): void;
} | null;

export const StandardModalHeader = props => {
  let { onHide, caption } = props;
  return (
    <>
      <div className="standard-reach-header">
        <div className="modal-title">{caption}</div>
        <span
          style={{ cursor: "pointer", marginLeft: "auto" }}
          className="close"
          onClick={onHide}
        >
          <span>&times;</span>
        </span>
      </div>
      <hr />
    </>
  );
};

export const ModalSizingContext = createContext<Partial<ContextProps>>(null);

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

const Modal: SFC<any> = props => {
  let { isOpen, onHide, headerCaption, children } = props;

  const modalTransition = useTransition(!!isOpen, {
    config: isOpen ? { ...config.stiff } : { duration: 150 },
    from: { opacity: 0, transform: `translate3d(0px, -10px, 0px)` },
    enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(0px, 10px, 0px)` }
  });

  const animatModalSizing = useRef(true);
  const modalSizingPacket = useMemo(() => {
    return {
      disable() {
        animatModalSizing.current = false;
      },
      enable() {
        animatModalSizing.current = true;
      }
    };
  }, []);

  return (
    <ModalSizingContext.Provider value={modalSizingPacket}>
      {modalTransition(
        (styles, isOpen) =>
          isOpen && (
            <AnimatedDialogOverlay
              allowPinchZoom={true}
              onDismiss={onHide}
              isOpen={isOpen}
              style={{ opacity: styles.opacity }}
              as="div"
            >
              <AnimatedDialogContent
                style={{
                  border: "4px solid hsla(0, 0%, 0%, 0.5)",
                  borderRadius: 10,
                  maxWidth: "600px",
                  ...styles
                }}
                as="div"
              >
                <ModalContents
                  onHide={onHide}
                  header={headerCaption}
                  contents={children}
                  animatModalSizing={animatModalSizing}
                />
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </ModalSizingContext.Provider>
  );
};

const ModalContents = ({ header, contents, onHide, animatModalSizing }) => {
  const [sizingRef, contentHeight] = useHeight();
  const uiReady = useRef(false);

  const heightStyles = useSpring({
    immediate: !uiReady.current || !animatModalSizing.current,
    config: { ...config.stiff },
    to: { height: contentHeight },
    onRest: () => (uiReady.current = true)
  });

  return (
    <animated.div style={{ overflow: "hidden", ...heightStyles }}>
      <div style={{ padding: "10px" }} ref={sizingRef}>
        <StandardModalHeader caption={header} onHide={onHide} />
        {contents}
      </div>
    </animated.div>
  );
};

export default Modal;
