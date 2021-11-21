import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import UserIconSVG from '@icons/svg/user.svg';

import isEmpty from '@utils/isEmpty';
import SvgIcon from './SvgIcon';

const propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  size: PropTypes.number,
  defaultIconSize: PropTypes.number,
  variant: PropTypes.oneOf(['circular', 'rounded', 'square']),
  hasBorder: PropTypes.bool,
};

const defaultProps = {
  src: null,
  size: 36,
  defaultIconSize: 18,
  variant: 'circular',
  hasBorder: false,
};

const getVariantBorderRadius = (variant, theme) => {
  let returnItem = '';
  switch (variant) {
  case 'circular':
    returnItem = '50%';
    break;
  case 'rounded':
    returnItem = 5;
    break;
  case 'square':
    returnItem = 0;
    break;
  default:
    returnItem = '50%';
    break;
  }
  return returnItem;
};

const AvatarComponent = styled('img')(({ size, boxShadow, theme, variant, index, overlap, overlapMargin }) => ({
  width: size,
  height: size,
  objectFit: 'cover',
  marginLeft: overlap && index && -overlapMargin,
  borderRadius: getVariantBorderRadius(variant, theme),
  boxShadow: boxShadow ? '0px 0px 5px 0px rgba(0, 0, 0, 0.35)' : 'unset',
}));

const AvatarContainerImage = styled('div')(
  ({
    size,
    variant,
    hasBorder,
    theme,
  }) => ({
    width: size,
    height: size,
    borderRadius: getVariantBorderRadius(variant, theme),
    flexShrink: 0,
    justifyContent: 'center',
    display: 'flex',
    border: hasBorder ? `1px solid ${theme.secondaryColor}` : 0,
    overflow: 'hidden',
  }),
);

const DefaultAvatarComponent = styled('div')(({ size, theme }) => ({
  width: size,
  height: size,
  marginInlineEnd: '8px !important',
  borderRadius: '50%',
  backgroundColor: theme.profileImageDefaultBgColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}));

const AvatarContainer = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
}));

const Avatar = ({
  src,
  size,
  defaultIconSize,
  variant,
  hasBorder,
}) => {
  const [isError, setIsError] = useState(false);

  return (isEmpty(src) || isError ? (
    <DefaultAvatarComponent size={size}>
      <SvgIcon size={defaultIconSize} src={UserIconSVG} />
    </DefaultAvatarComponent>
  ) : (
    <AvatarContainer>
      <AvatarContainerImage
        size={size}
        variant={variant}
        hasBorder={hasBorder}
      >
        <AvatarComponent
          size={size}
          src={src}
          onError={() => setIsError(true)}
        />
      </AvatarContainerImage>
    </AvatarContainer>
  ));
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
