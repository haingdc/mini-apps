import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export var Background = styled.div`

`;

export var Frame = styled.div`

`;

export var Container = styled.div`

`;


export var Logo = styled.img`

`;

export var Button = styled(ReactRouterLink)`
  display: block;
  background-color: #e50914;
  width: 84px;
  height: fit-content;
  color: #fff;
  border: 0;
  font-size: 15px;
  border-radius: 3px;
  padding: 8px 17px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #f40612;
  }
`;