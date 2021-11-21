import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const propTypes = {
  hasHover: PropTypes.bool,
  tabIndex: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  size: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  hasHover: true,
  tabIndex: 0,
  size: 'auto',
};

const IconButtonComponent = styled('div')(
  ({ theme, hasHover, disabled, size }) => ({
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': size,
    'height': size,
    'borderRadius': 4,
    'backgroundColor': disabled ? `${theme.iconBtnBGDisabledIconColor} !important` : theme.iconBtnBGIconColor,
    'fill': disabled ? `${theme.iconBtnDisabledIconColor} !important` : theme.iconBtnIconColor,
    'color': disabled ? `${theme.iconBtnDisabledIconColor} !important` : theme.iconBtnIconColor,
    'border': 0,
    'pointerEvents': disabled ? 'none' : 'auto',
    'cursor': 'pointer',
    'transition': 'all 0.2s ease',

    '&:hover': {
      transition: 'all 0.2s ease',
      backgroundColor: hasHover ? theme.iconBtnBGHoverIconColor : 'transparent',
      fill: hasHover ? theme.iconBtnHoverIconColor : theme.iconBtnIconColor,
      color: hasHover ? theme.iconBtnHoverIconColor : theme.iconBtnIconColor,
    },

    '&:active': {
      backgroundColor: hasHover ? theme.iconBtnBGActiveIconColor : 'transparent',
      fill: hasHover ? theme.iconBtnActiveIconColor : theme.iconBtnIconColor,
      color: hasHover ? theme.iconBtnActiveIconColor : theme.iconBtnIconColor,
    },
  }),
);

/**
 * Needs SvgIcon Component as children
 */
const IconButton = ({ tabIndex, ...others }) => (
  <IconButtonComponent tabIndex={tabIndex} {...others} />
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
