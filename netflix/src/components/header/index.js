import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Profile, Picture, Dropdown, Group, Feature, FeatureCallOut, Text, Link, ButtonLink, Background, Container, Logo, Search, SearchIcon, PlayButton, SearchInput } from './styles/header';

export default function Header(props) {
  var { bg = true, children, ...rest } = props;
  return bg ? <Background data-testid="header-bg" {...rest}>{children}</Background> : children;
}

Header.Feature = function HeaderFeature(props) {
  var { children, ...rest } = props;
  return <Feature {...rest}>{children}</Feature>
}

Header.FeatureCallOut = function HeaderFeatureCallOut(props) {
  var { children, ...rest } = props;
  return <FeatureCallOut {...rest}>{children}</FeatureCallOut>
}

Header.Text = function HeaderText(props) {
  var { children, ...rest } = props;
  return <Text {...rest}>{children}</Text>
}

Header.Frame = function HeaderFrame(props) {
  var { children, ...rest } = props;
  return <Container {...rest}>{children}</Container>;
}

Header.Group = function HeaderGroup(props) {
  var { children, ...rest } = props;
  return <Group {...rest}>{children}</Group>;
}

Header.Logo = function HeaderLogo(props) {
  var { to, ...rest } = props;
  return (
    <ReactRouterLink to={to}>
      <Logo {...rest} />
    </ReactRouterLink>
  );
}

Header.ButtonLink = function HeaderButtonLink(props) {
  var { children, ...rest } = props;
  return <ButtonLink {...rest}>{children}</ButtonLink>
}

Header.TextLink = function HeaderTextLink(props) {
  var { children, ...rest } = props;
  return <Link {...rest}>{children}</Link>
}

Header.Picture = function HeaderPicture({ src, ...rest }) {
  return <Picture {...rest} src={`/images/users/${src}.png`} />;
}

Header.Profile = function HeaderProfile(props) {
  var { children, ...rest } = props;
  return <Profile {...rest}>{children}</Profile>
}

Header.Dropdown = function HeaderDropdown(props) {
  var { children, ...rest } = props;
  return <Dropdown {...rest}>{children}</Dropdown>
}

Header.Search = function HeaderSearch(props) {
  var { searchTerm, setSearchTerm, ...rest } = props;
  var [searchActive, setSearchActive] = useState(false);
  return (
    <Search {...rest}>
      <SearchIcon onClick={() => setSearchActive(searchActive => !searchActive)} data-testid="search-click">
        <img src="/images/icons/search.png" alt="Search" />
      </SearchIcon>
      <SearchInput
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Search films and series"
        active={searchActive}
        data-testid="search-input"
      />
    </Search>
  );
}

Header.PlayButton = function HeaderPlayButton(props) {
  var { children, ...rest } = props;
  return <PlayButton {...rest}>{children}</PlayButton>
}