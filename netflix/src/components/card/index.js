import { Container, Item, Image, Feature, FeatureTitle, FeatureText, FeatureClose, Maturity, Content, Entities, Meta, Group, Text, Title, SubTitle } from './styles/card';
import React , { createContext, useContext, useState } from 'react';

export var FeatureContext = createContext();

export default function Card(props) {
  var { children, ...rest } = props;
  var [showFeature, setShowFeature] = useState(false);
  var [itemFeature, setItemFeature] = useState({});

  return (
    <FeatureContext.Provider
      value={{showFeature, setShowFeature, itemFeature, setItemFeature}}
    >
      <Container {...rest}>{children}</Container>
    </FeatureContext.Provider>
  );
}

Card.Text = function CardText({ children, ...rest }) {
  return <Text {...rest}>{children}</Text>
}

Card.Title = function CardTitle({ children, ...rest }) {
  return <Title {...rest}>{children}</Title>
}

Card.SubTitle = function CardSubTitle({ children, ...rest }) {
  return <SubTitle {...rest}>{children}</SubTitle>
}

Card.Group = function CardGroup({ children, ...rest }) {
  return <Group {...rest}>{children}</Group>
}

Card.Meta = function CardMeta({ children, ...rest }) {
  return <Meta {...rest}>{children}</Meta>
}

Card.Entities = function CardEntities({ children, ...rest }) {
  return <Entities {...rest}>{children}</Entities>
}

Card.Item = function CardItem(props) {
  var { children, item, ...rest } = props;
  var { setShowFeature, setItemFeature } = useContext(FeatureContext);
  return (
    <Item
      onClick={() => {
        setItemFeature(item);
        setShowFeature(true);
      }}
      {...rest}
    >
      {children}
    </Item>
  );
}

Card.Image = function CardImage(props) {
  return <Image {...props} />;
}

Card.Feature = function CardFeature(props) {
  var { children, category, ...rest } = props;
  var { showFeature, itemFeature, setShowFeature } = useContext(FeatureContext);
  console.log({ showFeature })
  return showFeature ? (
    <Feature src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`} {...rest}>
      <Content>
        <FeatureTitle>{itemFeature.title}</FeatureTitle>
        <FeatureText>{itemFeature.description}</FeatureText>
        <FeatureClose onClick={() => setShowFeature(false)}>
          <img src="/images/icons/close.png" alt="Close" />
        </FeatureClose>
      </Content>

      <Group margin="30px 0" flexDirection="row" alignItems="center">
        <Maturity rating={itemFeature.maturity}>
          {itemFeature.maturity < 12 ? 'PG' : itemFeature.maturity}
        </Maturity>
        <FeatureText fontWeight="bold">
          {itemFeature.genre.charAt(0).toUpperCase() + itemFeature.genre.slice(1)}
        </FeatureText>
      </Group>
    </Feature>
  ) : null;
}