import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export var Background = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${ ({ src }) => (src ? `../images/misc/${src}.jpg` : `../images/misc/home-bg.jpg`) });
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
`;

export var Container = styled.div`
  display: flex;
  margin: 0 56px;
  height: 64px;
  padding: 18px 0;
  justify-content: space-between;
  align-items: center;
  a {
    display: flex;
  }
  @media(max-width: 1000px) {
    margin: 0 30px;
  }
`;


export var Logo = styled.img`
  height: 32px;
  width: 108px;
  margin-right: 40px;
  @media(min-width: 1449px) {
    height: 45px;
    width: 167px;
  }
`;

export var ButtonLink = styled(ReactRouterLink)`
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