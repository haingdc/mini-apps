import styled from 'styled-components/macro';

export var Text = styled.p`
  margin-top: 5px;
  font-size: 10px;
  color: #fff;
  margin-bottom: 0;
  user-select: none;
  display: none;
  line-height: normal;
`;

export var Meta = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  padding: 10px;
  background-color: #0000000f;
`;

export var Title = styled.p`
  font-size: 24px;
  color: #e5e5e5;
  font-weight: bold;
  margin: 0 56px;
`;

export var Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  > ${Title} {
    @media (max-width: 1000px) {
      margin-left: 30px;
    }
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export var SubTitle = styled.p`
  font-size: 12px;
  color: #fff;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
  user-select: none;
  display: none;
`;

export var Group = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection === 'row' ? 'row' : 'column'};
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ margin }) => margin && `margin: ${margin};`}

  > ${Container}:first-of-type {
    @media (min-width:  1100px) {
      margin-top: -150px;
    }
  }
`;

export var Item = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.3);
    z-index: 99;
  }
  &:first-of-type {
    margin-left: 56px;
    @media (max-width: 1000px) {
      margin-left: 30px;
    }
  }
  &:last-of-type {
    margin-right: 56px;
    @media (max-width: 1000px) {
      margin-right: 30px;
    }
  }
  @media(min-width: 1200px) {
    &:hover ${Meta},
    &:hover ${Text},
    &:hover ${SubTitle}{
      display: block;
      z-index: 100;
    }
  }
`;

export var FeatureText = styled.p`
  font-size: 18px;
  color: #fff;
  font-weight: ${({ fontWeight }) => (fontWeight === 'bold' ? 'bold' : 'normal')};
  margin: 0;
  @media (max-width: 600px) {
    line-height: 22px;
  }
`;

export var Feature = styled.div`
  display: flex;
  background: url(${({ src }) => src});
  background-size: contain;
  position: relative;
  height: 360px;
  background-position-x: right;
  background-repeat: no-repeat;
  background-color: #000;
  @media (max-width : 1000px) {
    height: auto;
    background-size: auto;
    ${Title} {
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 10px;
    }
    ${FeatureText} {
      font-size: 14px;
    }
  }
`;
export var FeatureTitle = styled(Title)`
  margin-left: 0;
`;

export var FeatureClose = styled.button`
  color: #fff;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  img {
    filter: brightness(0) invert(1);
    width: 24px;
  }
`;
export var Maturity = styled.div`
  background-color: ${({ rating}) => (rating >= 15 ? 'red' : 'green')};
  border-radius: 15px;
  width: 28px;
  padding: 5px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  margin-right: 10px;
  font-size: 12px;
`;
export var Content = styled.div`
  margin: 56px;
  max-width: 500px;
  line-height: normal;
  @media (max-width: 1000px) {
    margin: 30px;
    max-width: none;
  }
`;
export var Entities = styled.div`
  display: flex;
  gap: 5px;
`;

export var Image = styled.img`
  border: 0;
  width: 100%;
  max-width: 305px;
  cursor: pointer;
  height: auto;
  padding: 0;
  margin: 0;
`;