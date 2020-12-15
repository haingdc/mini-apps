import styled from 'styled-components/macro';

export var Container = styled.div.attrs(props => ({
  style: {
    left: `${props.left}px`,
    top : `${props.top }px`,
    backgroundPosition: `${props.backgroundPosition}px`,
  },
}))`
  position: absolute;
  width : 30px;
  height: 23px;
  background-image: url('/images/misc/frog.png');
`;