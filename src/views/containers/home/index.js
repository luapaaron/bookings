import React from 'react';
import styled from '@emotion/styled';

import mq from '@styles/mediaQueries';

const HomeContainer = styled('div')(
  mq({
    padding: [0, '0 24px'],
    display: 'flex',
    marginTop: [0, 30],
  }),
);

const Home = () => (
  <HomeContainer>
    Home
  </HomeContainer>
);

export default Home;
