import styled from 'styled-components/macro';

export var Item = styled.div`
  display: flex;
  border-bottom: 8px solid #222;
  padding: 50px 5%;
  color: #fff;
  overflow: hidden;
`;

export var Inner = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: auto;
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export var Pane = styled.div`
  width: 50%;

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 45px;
    text-align: center;
  }
`;
export var Title = styled.h1`
  font-size: 50px;
  line-height: 1.1;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;
export var SubTitle = styled.h2`
  font-size: 26px;
  font-weight: normal;
  line-height: normal;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export var Image = styled.img`
  max-width: 100%;
  height: auto;
`;

export var Container = styled.div``;
