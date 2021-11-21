import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Text from '@components/Text';

const propTypes = {
  text: PropTypes.string,
};
const defaultProps = {
  text: '',
};

const EmptyDataContainer = styled('div')({
  width: '100%',
  minHeight: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const EmptyData = ({ text }) => (
  <EmptyDataContainer>
    <Text color='#aaaaaa' bold fontSize={20}>{text}</Text>
  </EmptyDataContainer>
);

EmptyData.propTypes = propTypes;
EmptyData.defaultProps = defaultProps;
export default EmptyData;
