import { Button, Close, Container, Inner, Overlay } from './styles/player';
import ReactDOM from 'react-dom';
import React , { createContext, useContext, useState } from 'react';

export var PlayerContext = createContext();

export default function Player(props) {
  var { children, ...rest } = props;
  var [showPlayer, setShowPlayer] = useState(false);

  return (
    <PlayerContext.Provider value={{showPlayer, setShowPlayer}}>
      <Container {...rest}>{children}</Container>
    </PlayerContext.Provider>
  );
}

Player.Video = function PlayerVideo({ src, ...rest }) {
  var { showPlayer, setShowPlayer } = useContext(PlayerContext);
  return showPlayer ? ReactDOM.createPortal(
    <Overlay onClick={() => setShowPlayer(false)}>
      <Inner>
        <video id="netflix-player" controls>
          <source src={src} type="video/mp4" />
        </video>
        <Close />
      </Inner>
    </Overlay>,
    document.body
  ) : null;
}

Player.Button = function PlayerButton(props) {
  var { setShowPlayer } = useContext(PlayerContext);

  return (
    <Button onClick={() => setShowPlayer((showPlayer) => !showPlayer)}>
      Play
    </Button>
  );
}