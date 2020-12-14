import styled from 'styled-components/macro';

export var Container = styled.div``;
export var Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  margin: 0 20px;
`;

export var Inner = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: auto;
  video {
    height: 100%;
    width: 100%;
  }
`;

export var Button = styled.button`
  background-color: #e50914;
  border-color: #ff0a10;
  width: 114px;
  height: 45px;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  font-size: 18px;
  height: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0;
  &:hover {
    transform: scale(1.05);
    background-color: #ff0a16;
  }
`;