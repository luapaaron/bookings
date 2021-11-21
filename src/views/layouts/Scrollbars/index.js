import React, { useState, useRef, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

let leftButtonPressedWhenHovering = false;
let eventSet = false;

const ScrollbarsComponent = ({
  isRTL,
  children,
  autoHeight,
  autoHeightMin,
  autoHeightMax,
  hideHorizontalScrollBar,
  hideVerticalScrollBar,
  id,
}) => {
  const [trackVerticalStyle, setTrackVerticalStyle] = useState({
    position: 'absolute',
    width: 3,
    transition: 'height 0.4s, width 0.3s, opacity 0.2s',
    opacity: '0',
    bottom: 2,
    top: 2,
    borderRadius: 3,
  });
  const [trackHorizontalStyle, setTrackHorizontalStyle] = useState({
    position: 'absolute',
    height: 3,
    transition: 'height 0.4s, width 0.3s, opacity 0.2s',
    opacity: '0',
    bottom: 0,
    borderRadius: 3,
    width: '100%',
  });

  const [trackVerticalThumbStyle] = useState({
    position: 'relative',
    display: 'block',
    width: '100%',
    cursor: 'pointer',
    borderRadius: 3,
  });

  const trackVerticalHover = () => {
    const trackVerticalhoverValues = {
      ...trackVerticalStyle,
      width: 8,
      backgroundColor: '#EDEDED',
      borderRadius: 6,
    };

    setTrackVerticalStyle(trackVerticalhoverValues);
  };

  const trackHorizontalHover = () => {
    const trackHorizontalHoverValues = {
      ...trackHorizontalStyle,
      height: 8,
      backgroundColor: '#EDEDED',
      borderRadius: 6,
    };

    setTrackHorizontalStyle(trackHorizontalHoverValues);
  };

  const trackHorizontalOut = () => {
    const trackHorizontalhoverValues = {
      ...trackHorizontalStyle,
      height: 3,
      backgroundColor: 'transparent',
      borderRadius: 3,
    };

    setTrackHorizontalStyle(trackHorizontalhoverValues);
  };

  const scrollbars = useRef(null);

  const handleMouseEnterOnScrollbar = (e) => {
    leftButtonPressedWhenHovering = e.buttons === 1;
  };

  const handleMouseUpInsideDocument = (e) => {
    document.removeEventListener('mouseup', handleMouseUpInsideDocument);
    const trackVerticalhoverValues = {
      ...trackVerticalStyle,
      width: 3,
      backgroundColor: 'transparent',
      borderRadius: 3,
    };

    setTrackVerticalStyle(trackVerticalhoverValues);
    eventSet = false;
  };

  const handleMouseLeaveOffScrollbar = (e) => {
    if (!leftButtonPressedWhenHovering && e.buttons === 1 && !eventSet) {
      /* your mouse down logic here */
      document.addEventListener('mouseup', handleMouseUpInsideDocument);
      eventSet = true;
    } else {
      const trackVerticalhoverValues = {
        ...trackVerticalStyle,
        width: 3,
        backgroundColor: 'transparent',
        borderRadius: 3,
      };

      setTrackVerticalStyle(trackVerticalhoverValues);
    }
  };

  const handleMouseUpInsideScrollbar = (e) => {
    leftButtonPressedWhenHovering = false;
  };

  useEffect(() => {
    console.log('lala trackVerticalStyle', trackVerticalStyle);
    let placement = { right: 2 };
    if (isRTL) {
      delete trackVerticalStyle.right;
      placement = { left: 2 };
    } else {
      delete trackVerticalStyle.left;
    }

    setTrackVerticalStyle({ ...trackVerticalStyle, ...placement });
  }, [isRTL]);

  return (
    <Scrollbars
      autoHeight={autoHeight}
      autoHeightMin={autoHeightMin}
      autoHeightMax={autoHeightMax || 200}
      renderView={({ style, ...props }) => (
        <div
          className='scroll-view'
          id={id}
          tabIndex='-1'
          {...props}
          style={{
            ...style,
            overflowX: hideHorizontalScrollBar ? 'hidden' : 'scroll',
            overflowY: hideVerticalScrollBar ? 'hidden' : 'scroll',
            marginBottom: hideHorizontalScrollBar ? '0px' : '-15px',
            marginRight: hideVerticalScrollBar ? 0 : isRTL ? 0 : '-15px',
            marginLeft: hideVerticalScrollBar ? 0 : isRTL ? '-15px' : 0,
          }}
        />
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          className='scroll-view-track-vertical'
          style={{
            ...style,
            ...trackVerticalStyle,
            display: hideVerticalScrollBar ? 'none' : 'block',
          }}
          onMouseOver={() => trackVerticalHover()}
          onFocus={() => trackVerticalHover()}
        />
      )}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          className='thumb-vertical'
          style={{
            ...style,
            ...trackVerticalThumbStyle,
            backgroundColor: '#A0A0A0',
          }}
          onMouseEnter={handleMouseEnterOnScrollbar}
          onMouseLeave={handleMouseLeaveOffScrollbar}
          onMouseUp={handleMouseUpInsideScrollbar}
          role='button'
          tabIndex={0}
        />
      )}
      renderTrackHorizontal={({ style, ...props }) => (
        <div
          {...props}
          className='scroll-view-track-horizontal'
          style={{
            ...style,
            ...trackHorizontalStyle,
            display: hideHorizontalScrollBar ? 'none' : 'block',
          }}
          onMouseOver={() => trackHorizontalHover()}
          onMouseOut={trackHorizontalOut}
          onFocus={() => trackHorizontalHover()}
          onBlur={trackHorizontalOut}
        />
      )}
      renderThumbHorizontal={({ style, ...props }) => (
        <div
          {...props}
          className='thumb-horizontal'
          style={{
            ...style,
            ...trackVerticalThumbStyle,
            backgroundColor: '#A0A0A0',
          }}
        />
      )}
      autoHide
      ref={scrollbars}
    >
      {children}
    </Scrollbars>
  );
};

const propTypes = {
  children: PropTypes.node.isRequired,
  autoHeight: PropTypes.bool,
  autoHeightMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoHeightMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideHorizontalScrollBar: PropTypes.bool,
  hideVerticalScrollBar: PropTypes.bool,
};

ScrollbarsComponent.propTypes = propTypes;
ScrollbarsComponent.defaultProps = {
  autoHeight: false,
  autoHeightMin: 0,
  autoHeightMax: 0,
  hideHorizontalScrollBar: false,
  hideVerticalScrollBar: false,
};

export default ScrollbarsComponent;
