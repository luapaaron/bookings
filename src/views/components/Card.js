import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import mq from '@styles/mediaQueries';

const propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  margin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  borderRadius: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  zIndex: PropTypes.number,
  noShadow: PropTypes.bool,
  clickable: PropTypes.bool,
  noBorder: PropTypes.bool,
  minHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  backgroundColor: PropTypes.string,
};

const defaultProps = {
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  borderRadius: 5,
  zIndex: 0,
  noShadow: false,
  clickable: false,
  noBorder: false,
  minHeight: 'auto',
  backgroundColor: '#FFF',
};

export const hasBorder = (noShadow, theme) => (noShadow ? `1px solid ${theme.cardBorderColor}` : 'unset');

const Card = styled('div')(({
  width,
  height,
  margin,
  padding,
  borderRadius,
  zIndex,
  theme,
  noShadow,
  clickable,
  image,
  noBorder,
  minHeight,
  backgroundColor,
}) => mq({
  position: 'relative',
  width,
  height,
  padding,
  borderRadius,
  zIndex,
  minHeight,
  margin,
  cursor: clickable ? 'pointer' : 'default',
  backgroundColor: backgroundColor || theme.cardBackgroundColor,
  border: noBorder ? 'none' : hasBorder(noShadow, theme),
  boxShadow: noShadow ? 'unset' : `0px 0px 5px 0px ${theme.cardShadowColor}`,
}));

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
