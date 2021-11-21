import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import isEmpty from '@utils/isEmpty';
import mq from '@styles/mediaQueries';

import Loader from '@components/Loader';

const propTypes = {
  fontSize: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  ]),
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'default']),
  variant: PropTypes.oneOf(['outlined', 'contained', 'text']),
  radius: PropTypes.oneOf(['circular', 'rounded']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  textUnderline: PropTypes.bool,
  display: PropTypes.string,
};

const defaultProps = {
  fontSize: 16,
  width: null,
  height: null,
  minWidth: 126,
  padding: '6px 16px',
  margin: 0,
  justifyContent: 'center',
  alignItems: 'center',
  color: '',
  borderColor: '',
  size: 'default',
  radius: 'rounded',
  variant: 'contained',
  loading: false,
  disabled: false,
  textUnderline: false,
  display: 'flex',
};

const getHeightBasedOnSize = (size, variant, theme) => {
  let item = 0;
  switch (size) {
  case 'tiny':
    item = 24;
    if (variant === 'text') item = 18;
    break;
  case 'small':
    item = 32;
    if (variant === 'text') item = 24;
    break;
  default:
    item = 48;
    if (variant === 'text') item = 24;
    break;
  }
  return item;
};

const getBorder = (getBorderColor, getColor, getTheme) => {
  if (!isEmpty(getBorderColor)) {
    return `1px solid ${getBorderColor}`;
  }
  if (isEmpty(getColor)) {
    return `1px solid ${getTheme.primaryColor}`;
  }
  if (!isEmpty(getColor)) {
    return `1px solid ${getColor}`;
  }
  return '';
};

const getVariantCSS = (variant, color, borderColor, theme) => {
  let item = null;
  switch (variant) {
  case 'outlined':
  case 'text':
    item = {
      border: variant === 'outlined' ? getBorder(borderColor, color, theme) : 0,
      backgroundColor: 'transparent',
      backgroundColorHover: 'transparent',
      backgroundColorActive: theme.fillBtnOutlinedBgColorActive,
      color: isEmpty(color) ? theme.primaryColor : color,
      fill: isEmpty(color) ? theme.primaryColor : color,
      backgroundColorDisabled: 'transparent',
      colorDisabled: theme.fillBtnDisabledColor,
      fillDisabled: theme.fillBtnDisabledColor,
      borderDisabled: variant === 'outlined' ? `1px solid ${theme.fillBtnDisabledBgColor}` : 0,
    };
    break;
  default:
    item = {
      border: 0,
      backgroundColor: isEmpty(color) ? theme.fillBtnBgColor : color,
      backgroundColorHover: isEmpty(color) ? theme.fillBtnHoverBgColor : darken(0.1, color),
      backgroundColorActive: isEmpty(color) ? theme.fillBtnActiveBgColor : darken(0.2, color),
      color: theme.fillBtnTextColor,
      fill: theme.fillBtnTextColor,
      backgroundColorDisabled: theme.fillBtnDisabledBgColor,
      colorDisabled: theme.fillBtnTextColor,
      fillDisabled: theme.fillBtnTextColor,
      borderDisabled: 0,
    };
    break;
  }
  return item;
};

const FillButtonContainer = styled('div')(({ margin, justifyContent, display }) => ({
  position: 'relative',
  display,
  margin,
  justifyContent,
}));

const CurrentWidth = (getRadius, getWidth, getSize, getVariant, getTheme) => {
  if (getRadius === 'rounded' || !isEmpty(getWidth)) {
    return getWidth;
  }
  return getHeightBasedOnSize(getSize, getVariant, getTheme);
};

const FillButtonComponent = styled('button')(
  {
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
  },
  ({ theme, textUnderline, variant, fontSize, width, height, padding, justifyContent, alignItems, radius, minWidth, size, color, borderColor }) => mq({
    'cursor': 'pointer',
    'display': 'flex',
    justifyContent,
    alignItems,
    fontSize,
    'fontWeight': 700,
    'lineHeight': '22px',
    padding,
    'minWidth': (radius === 'rounded' && variant !== 'text') ? minWidth : 0,
    'width': CurrentWidth(radius, width, size, variant, theme),
    'height': !isEmpty(height) ? height : getHeightBasedOnSize(size, variant, theme),
    'borderRadius': radius === 'rounded' ? 4 : '50%',
    'backgroundColor': getVariantCSS(variant, color, borderColor, theme).backgroundColor,
    'color': getVariantCSS(variant, color, borderColor, theme).color,
    'fill': getVariantCSS(variant, color, borderColor, theme).fill,
    'border': getVariantCSS(variant, color, borderColor, theme).border,
    'pointerEvents': 'auto',
    'opacity': 1,
    'transition': 'ease-in-out 0.3s all',
    'whiteSpace': 'nowrap',
    'textDecoration': textUnderline && 'underline',
    '&: hover': {
      backgroundColor: getVariantCSS(variant, color, borderColor, theme).backgroundColorHover,
    },

    '&: active': {
      backgroundColor: getVariantCSS(variant, color, borderColor, theme).backgroundColorActive,
    },

    '&: disabled': {
      backgroundColor: getVariantCSS(variant, color, borderColor, theme).backgroundColorDisabled,
      color: getVariantCSS(variant, color, borderColor, theme).colorDisabled,
      fill: getVariantCSS(variant, color, borderColor, theme).fillDisabled,
      border: getVariantCSS(variant, color, borderColor, theme).borderDisabled,
      pointerEvents: 'all',
      cursor: 'not-allowed',
    },
  }),
);

const PreIconContainer = styled('span')(() => ({
  display: 'flex',
  paddingRight: 8,
}));

const SuffixIconContainer = styled('span')(() => ({
  display: 'flex',
  paddingLeft: 8,
}));

const FillButton = ({
  id,
  variant,
  radius,
  size,
  startIcon,
  endIcon,
  width,
  height,
  fontSize,
  justifyContent,
  alignItems,
  color,
  borderColor,
  padding,
  margin,
  minWidth,
  children,
  loading,
  disabled,
  alignButton,
  textUnderline,
  display,
  ...others
}) => (
  <FillButtonContainer margin={margin} justifyContent={alignButton} display={display}>
    <FillButtonComponent
      id={id}
      variant={variant}
      radius={radius}
      size={size}
      width={width}
      height={height}
      fontSize={fontSize}
      justifyContent={justifyContent}
      alignItems={alignItems}
      padding={padding}
      disabled={disabled || loading}
      minWidth={minWidth}
      color={color}
      borderColor={borderColor}
      textUnderline={textUnderline}
      {...others}
    >
      {
        loading ? <Loader isWhite /> :
          (
            <>
              {!isEmpty(startIcon) && (
                <PreIconContainer>
                  {startIcon}
                </PreIconContainer>
              )}
              {children}
              {!isEmpty(endIcon) && (
                <SuffixIconContainer>
                  {endIcon}
                </SuffixIconContainer>
              )}
            </>
          )
      }

    </FillButtonComponent>
  </FillButtonContainer>
);

FillButton.propTypes = propTypes;
FillButton.defaultProps = defaultProps;

export default FillButton;
