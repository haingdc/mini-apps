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

export var Container = styled.div`
  
`;