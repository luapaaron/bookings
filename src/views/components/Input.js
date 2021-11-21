import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import isEmpty from '@utils/isEmpty';

import mq from '@styles/mediaQueries';

import Text from '@components/Text';
import SvgIcon from '@components/SvgIcon';

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['circular', 'rounded', 'square']),
  label: PropTypes.string,
  preIcon: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.obj, PropTypes.func]),
  suffixIcon: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.obj]),
  border: PropTypes.string,
  fontSize: PropTypes.string,
  suffixIconZindex: PropTypes.number,
  readOnly: PropTypes.bool,
  width: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  maxWidth: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  cursor: PropTypes.string,
  onClick: PropTypes.func,
  borderRadius: PropTypes.string,
};

const defaultProps = {
  size: 'medium',
  variant: 'rounded',
  label: null,
  preIcon: null,
  suffixIcon: null,
  border: null,
  fontSize: null,
  suffixIconZindex: 10,
  readOnly: false,
  width: '100%',
  maxWidth: '100%',
  height: '',
  cursor: '',
  borderRadius: '',
  onClick: () => {
    // onclick handle
  },
};

const getHeightBasedOnSize = (size, theme) => {
  let item = 0;

  switch (size) {
  case 'small':
    item = theme.inputSmallHeight;
    break;
  case 'medium':
    item = theme.inputMediumHeight;
    break;
  case 'large':
    item = theme.inputLargeHeight;
    break;
  default:
    item = theme.inputMediumHeight;
    break;
  }

  return item;
};

const getVariantBorderRadius = (variant, size, theme) => {
  const roundedBorderRadius = getHeightBasedOnSize(size, theme);
  let item = null;

  switch (variant) {
  case 'circular':
    item = roundedBorderRadius;
    break;
  case 'rounded':
    item = 8 / 2;
    break;
  case 'square':
    item = 0;
    break;
  default:
    item = 8 / 2;
    break;
  }

  return item;
};

const InputContainer = styled('div')(({ width, maxWidth, height, cursor }) =>
  mq({
    'position': 'relative',
    'display': 'flex',
    'flexDirection': 'column',
    width,
    maxWidth,
    height,
    'cursor': !isEmpty(cursor) ? `${cursor} !important` : 'auto',

    '*': {
      cursor: !isEmpty(cursor) ? `${cursor} !important` : 'auto',
    },
  }));

const LabelComponent = styled('label')(() => ({
  position: 'absolute',
  display: 'block',
  top: 8,
  left: 8,
  zIndex: 10,
  fontSize: 11,
  pointerEvents: 'none',
}));

const InputWrapper = styled('div')(({ width }) => ({
  position: 'relative',
  display: 'flex',
  zIndex: 5,
  width,
}));

const getBorder = (isReadOnly, borderValue, getTheme) => {
  if (isEmpty(isReadOnly)) {
    if (isEmpty(borderValue)) {
      return `1px solid ${getTheme.inputBorderColorHover}`;
    }
    return borderValue;
  }
  return `1px solid ${getTheme.inputBorderColor}`;
};

const InputComponent = styled('input')(
  ({
    id,
    borderRadius,
    variant,
    size,
    theme,
    width,
    height,
    preIcon,
    suffixIcon,
    border,
    fontSize,
    label,
    backgroundColor,
    readOnly,
  }) =>
    mq({
      'position': 'relative',
      'display': 'block',
      'borderRadius': !isEmpty(borderRadius) ? borderRadius : getVariantBorderRadius(variant, size, theme),
      'border': isEmpty(border) ? `1px solid ${theme.inputBorderColor}` : border,
      'width': width,
      'height': !isEmpty(height) ? height : getHeightBasedOnSize(size, theme),
      'fontSize': isEmpty(fontSize) ? 16 : fontSize,
      'paddingLeft': isEmpty(preIcon) ? 8 : 44,
      'paddingRight': isEmpty(suffixIcon) ? 0 : 44,
      'paddingTop': isEmpty(label) ? 'unset' : 15,
      'fontFamily': 'Delivery, sans-serif',
      'zIndex': 5,
      'backgroundColor': isEmpty(backgroundColor) ? theme.inputBgColor : backgroundColor,
      'cursor': readOnly ? 'default' : 'intial',
      'userSelect': readOnly ? 'none' : 'intial',
      'caretColor': readOnly ? 'transparent' : 'intial',
      '&:hover': {
        border: getBorder(readOnly, border, theme),
      },
      '&:focus': {
        borderRadius: !isEmpty(borderRadius) ? borderRadius : getVariantBorderRadius(variant, size, theme),
        outline: 'none',
      },
    }),
);

const PreIconContainer = styled('div')(({ theme, preIcon, size }) => ({
  'display': 'flex',
  'position': 'absolute',
  'alignItems': 'center',
  'justifyContent': 'center',
  'left': 8 / 2 + 2,
  'top': '50%',
  'width': getHeightBasedOnSize(size, theme) - 8 - 2,
  'height': getHeightBasedOnSize(size, theme) - 8 - 2,
  'borderRadius': '50%',
  'transform': 'translateY(-50%)',
  'zIndex': 10,
  'backgroundColor': !isEmpty(preIcon.backgroundColor) ? preIcon.backgroundColor : 'unset',
  '& > svg': {
    width: 20,
    height: 20,
  },
}));

const SuffixIconContainer = styled('div')(({ theme, size, suffixIconZindex }) => ({
  'display': 'flex',
  'position': 'absolute',
  'alignItems': 'center',
  'justifyContent': 'center',
  'right': 8 / 2 + 2,
  'top': '50%',
  'width': getHeightBasedOnSize(size, theme) - 8 - 2,
  'height': getHeightBasedOnSize(size, theme) - 8 - 2,
  'borderRadius': '50%',
  'transform': 'translateY(-50%)',
  'zIndex': suffixIconZindex,
  '& > svg': {
    width: 20,
    height: 20,
  },
  'pointerEvents': 'none',
}));

/**
 * Input HTML element is used to create interactive controls for web-based
 * forms in order to accept data from the user; a wide variety of types
 * of input data and control widgets are available, depending on the device
 * and user agent.
 */
const Input =
  (
    {
      id,
      variant,
      size,
      label,
      preIcon,
      suffixIcon,
      width,
      height,
      backgroundColor,
      readOnly,
      suffixIconZindex,
      cursor,
      onClick,
      suffixLabel,
      borderRadius,
      maxWidth,
      innerRef,
      ...others
    },
  ) => {
    const onClickInput = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onClick(e);
    };
    return (
      <InputContainer width={width} maxWidth={maxWidth} height={height} cursor={cursor} onClick={onClickInput}>
        {!isEmpty(label) && <LabelComponent for={!isEmpty(others.name)}>{label}</LabelComponent>}
        <InputWrapper>
          {!isEmpty(preIcon) && (
            <PreIconContainer preIcon={preIcon} size={size}>
              {preIcon.icon}
            </PreIconContainer>
          )}
          <InputComponent
            id={id}
            variant={variant}
            size={size}
            width={width}
            height={height}
            preIcon={preIcon}
            suffixIcon={suffixIcon}
            label={label}
            backgroundColor={backgroundColor}
            readOnly={readOnly}
            ref={innerRef}
            borderRadius={borderRadius}
            {...others}
          />
          {!isEmpty(suffixIcon) && (
            <SuffixIconContainer suffixIcon={suffixIcon} suffixIconZindex={suffixIconZindex} size={size}>
              {suffixLabel ? <Text>{suffixIcon}</Text> : <SvgIcon src={suffixIcon} />}
            </SuffixIconContainer>
          )}
        </InputWrapper>
      </InputContainer>
    );
  };

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
