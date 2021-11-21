import React from 'react';
import styled from '@emotion/styled';

import Avatar from '@components/Avatar';
import Text from '@components/Text';

import logoPNG from '@icons/images/logo.png';
import sampleAvatar from '@icons/images/sample_profile_image.jpg';

import mq from '@styles/mediaQueries';

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
  boxShadow: `0px 0px 8px 0px ${theme.HeaderBoxShadowColor}`,
}));

const AvatarContainer = styled('div')(({
  'display': 'flex',
  'alignItems': 'center',
  '>*': {
    marginInlineStart: 20,
  },
}));

const Logo = styled('img')({
  width: 50,
});

const ProfileName = styled(Text)(mq({
  display: ['none', 'initial'],
}));

const Header = () => (
  <HeaderContainer>
    <Logo src={logoPNG} />
    <AvatarContainer>
      <ProfileName>Aaron Paul Labing-isa</ProfileName>
      <Avatar src={sampleAvatar} />
    </AvatarContainer>
  </HeaderContainer>
);

export default Header;
