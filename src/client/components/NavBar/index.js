import React from 'react';
import styled from 'styled-components';

const NavBackground = styled.div`
  background-color: #ccc;
  width: 100%;
`;

const Logo = styled.div.attrs({
  className: 'center measure-wide f4 pv3 lh-copy',
})``;

const NavBar = () => (
  <NavBackground>
    <Logo>Ready Check</Logo>
  </NavBackground>
);

export default NavBar;
