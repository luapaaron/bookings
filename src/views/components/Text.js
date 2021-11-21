import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import isEmpty from '@utils/isEmpty';

import mq from '@styles/mediaQueries';

const propTypes = {
  bold: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  noWrap: PropTypes.bool,
  isPrimaryColor: PropTypes.bool,
  color: PropTypes.string,
  paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const defaultProps = {
  bold: false,
  fontSize: 14,
  lineHeight: 'normal',
  noWrap: false,
  isPrimaryColor: false,
  color: '',
  paddingLeft: '',
  paddingRight: '',
  margin: 0,
};

const CurrentColor = (getColor, getIsPrimaryColor, getTheme) => {
  if (!isEmpty(getColor)) {
    return getColor;
  } if (getIsPrimaryColor) {
    return getTheme.primaryColor;
  }
  return getTheme.textColor;
};

const Text = styled('span')(
  ({
    theme,
    bold,
    fontSize,
    lineHeight,
    noWrap,
    isPrimaryColor,
    color,
    paddingLeft,
    paddingRight,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  }) =>
    mq({
      color: CurrentColor(color, isPrimaryColor, theme),
      fontWeight: bold ? 'bold' : 'inherit',
      fontSize,
      lineHeight: lineHeight || '',
      whiteSpace: noWrap ? 'nowrap' : 'normal',
      display: 'inline-block',
      paddingLeft,
      paddingRight,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
    }),
);

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
