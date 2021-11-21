import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  src: PropTypes.shape({
    id: PropTypes.string,
    viewBox: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  size: 0,
  width: 24,
  height: 24,
};

const SvgIcon = ({ size, width, height, src, ...other }) => (
  <svg {...other} width={size > 0 ? size : width} height={size > 0 ? size : height} viewBox={src.viewBox} focusable='false'>
    <use xlinkHref={`#${src.id}`} />
  </svg>
);

SvgIcon.propTypes = propTypes;
SvgIcon.defaultProps = defaultProps;

export default SvgIcon;
