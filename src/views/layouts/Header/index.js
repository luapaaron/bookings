import React from 'react';
import styled from '@emotion/styled';

// style
const HeaderContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: 63,
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  padding: '12px 22px',
  alignItems: 'center',
  backgroundColor: theme.secondaryColor,
}));

const Header = () => (
  <HeaderContainer>
    Header
  </HeaderContainer>
);

export default Header;
