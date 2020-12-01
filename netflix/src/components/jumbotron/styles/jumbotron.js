import styled from 'styled-components/macro';

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
`;
export var Title = styled.h1`
`;
export var SubTitle = styled.h2``;

export var Image = styled.image``;

export var Container = styled.div``;
