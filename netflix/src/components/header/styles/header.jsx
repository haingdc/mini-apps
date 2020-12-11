import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export var Background = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${ ({ src }) => (src ? `../images/misc/${src}.jpg` : `../images/misc/home-bg.jpg`) });
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  @media(max-width: 1100px) {
    ${({ dontShowOnSmallViewPort }) => dontShowOnSmallViewPort && 'background-image: none;'}
  }
`;

export var Group = styled.div`
  display: flex;
  align-items: center;
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

export var Feature = styled(Container)`
  padding: 150px 0 500px 0;
  flex-direction: column;
  align-items: normal;
  width: 50%;
  @media (max-width: 1100px) {
    display: none;
  }
`;

export var Text = styled.p`
  color: #fff;
  font-size: 22px;
  line-height: normal;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
  margin: 0;
`;


export var FeatureCallOut = styled.h2`
  color: #fff;
  font-size: 50px;
  line-height: normal;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
  margin: 0;
  margin-bottom: 20px;
`;

export var Picture = styled.button`
  background-size: contain;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-color: black;
  border: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

export var Link = styled.p`
  color: #fff;
  text-decoration: none;
  margin-right: 30px;
  font-weight: ${({ active }) => (active === 'true' ? '700' : 'normal')};
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

export var Dropdown = styled.div`
  display: none;
  background-color: black;
  position: absolute;
  padding: 10px;
  width: 100px;
  top: 32px;
  right: 10px;
  ${Group}:last-of-type ${Link} {
    cursor: pointer;
  }
  ${Group} {
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }
    ${Link}, ${Picture} {
      cursor: default;
    }
  }
  button {
    margin-right: 10px;
  }
  p {
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

export var Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  position: relative;
  button {
    cursor: pointer;
  }
  &:hover > ${Dropdown} {
    display: flex;
    flex-direction: column;
  }
`;

export var Search = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: #fff;
    cursor: pointer;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

export var SearchIcon = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  img {
    filter: brightness(0) invert(1);
    width: 16px;
  }
`;

export var SearchInput = styled.input`
  background-color:#44444459;
  color: #fff;
  border: 1px solid #fff;
  transition: width 0.35s ease-in;
  font-size: 14px;
  margin-left: ${({ active }) => (active === true ? '10px' : '0')};
  padding: ${({ active }) => (active === true ? '0 10px' : '0')};
  opacity: ${({ active }) => (active === true ? '1' : '0')};
  width: ${({ active }) => (active === true ? '200px' : '0px')};
`;