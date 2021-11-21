import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { configure, addDecorator, addParameters  } from '@storybook/react';

import './style.css'
import viewports from './viewports';
import themes from '../src/styles/themes';

addParameters({
  options: {
    name: 'Bookings',
    enableShortcuts: false,
    hierarchySeparator: /\//, // matches a . or /
    hierarchyRootSeparator: /\|/, //matches a |
  },
  viewport: { 
    viewports
  }
});

const Container = styled('div')({
    margin: '0 auto'
});

addDecorator((story) => {
  return (
    <ThemeProvider theme={themes.default}>
      <Container>{story()}</Container>
    </ThemeProvider>
  )
});
configure(require.context('../stories', true, /\.stories\.(js|jsx|mdx)$/), module);