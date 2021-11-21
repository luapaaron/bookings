import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import mq from '@styles/mediaQueries';

import loadingGIF from '@icons/gif/loader.gif';

const propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  width: '100px',
  height: '100px',
};

const LoaderContainer = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Loading = styled('div')(({ width, height }) => mq({
  backgroundImage: `url(${loadingGIF})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  width,
  height,
}));

const Loader = ({ width, height }) => (
  <LoaderContainer>
    <Loading width={width} height={height} />
  </LoaderContainer>
);

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
