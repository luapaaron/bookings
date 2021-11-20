import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

import emotionThemes from '@styles/themes';

import ViewPortLayer from '@components/ViewPortLayer';

const Container = styled(ViewPortLayer)({
  userSelect: 'none',
});

const ThemeRoot = ({ theming, children }) => {
  const themeSelected = emotionThemes[theming];
  return (
    <ThemeProvider theme={themeSelected}>
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default connect((state) => ({
  theming: state.common.config.theme,
}))(ThemeRoot);
