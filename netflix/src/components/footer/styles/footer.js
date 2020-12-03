import styled from 'styled-components/macro';

export var Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 70px 56px;
  margin: auto;
  max-width: 1000px;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export var Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export var Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 15px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export var Link = styled.a`
  color: #757575;
  margin-bottom: 20px;
  font-size: 14px;
  text-decoration: none;
`;

export var Title = styled.p`
  font-size: 16px;
  color: #757575;
  margin-bottom: 40px;
`;

export var Text = styled.p`
  font-size: 13px;
  color: #757575;
  margin-bottom: 40px;
`;

export var Break = styled.p`
  flex-basis: 100%;
  height: 0;
`;