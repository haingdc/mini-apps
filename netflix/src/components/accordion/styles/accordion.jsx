import styled from 'styled-components/macro';

export var Container = styled.div`
  display: flex;
  border-bottom: 8px solid #222;
`;

export var Inner = styled.div`
  display: flex;
  padding: 70px 45px;
  flex-direction: column;
  max-width: 815px;
  margin: auto;
`;

export var Item = styled.div`
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  max-width: 700px;
  width: 100%;
  &::first-of-type {
    margin-top: 3em;
  }
`;

export var Header = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 1px;
  font-size: 26px;
  font-weight: normal;
  background-color: #303030;
  padding: 0.8em 1.2em;
  user-select: none;
  align-items: center;

  img {
    filter: brightness(0) invert(1);
    width: 24px;
    @media (max-width: 600px) {
      width: 16px;
    }
  }

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export var Body = styled.div`
  font-size: 26px;
  font-weight: normal;
  line-height: normal;
  background-color: #303030;
  white-space: pre-wrap;
  user-select: none;
  overflow: hidden;

  & > div {
    padding: 0.8em 2.2em 1.2em;
  }
  @media(max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export var Frame = styled.div`
  margin-bottom: 40px;
`;

export var Title = styled.h1`
  font-size: 50px;
  line-height: 1.1.%;
  margin-top: 0;
  margin-bottom: 8px;
  color: #fff;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 35px;
  }
`;
