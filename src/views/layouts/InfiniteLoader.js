import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.string,
  hasMore: PropTypes.bool,
  initialLoad: PropTypes.bool,
  isReverse: PropTypes.bool,
  loader: PropTypes.node,
  loadMore: PropTypes.func.isRequired,
  pageStart: PropTypes.number,
  ref: PropTypes.func,
  threshold: PropTypes.number,
  useCapture: PropTypes.bool,
  useWindow: PropTypes.bool,
};

const defaultProps = {
  element: 'div',
  hasMore: false,
  initialLoad: false,
  pageStart: 0,
  ref: null,
  threshold: 250,
  useWindow: false,
  isReverse: false,
  useCapture: true,
  loader: null,
};

let scrollComponent = null;
let pageLoaded = null;

const InfiniteLoader = ({
  children,
  element,
  hasMore,
  initialLoad,
  isReverse,
  loader,
  loadMore,
  pageStart,
  ref,
  threshold,
  useCapture,
  useWindow,
  ...props
}) => {
  const calculateTopPosition = (el) => (el ? el.offsetTop + calculateTopPosition(el.offsetParent) : 0);
  const scrollListener = () => {
    const el = scrollComponent;
    const scrollEl = window;

    let offset;
    if (useWindow) {
      const doc = document.documentElement || document.body.parentNode || document.body;
      const scrollTop = scrollEl?.pageYOffset !== undefined
        ? scrollEl?.pageYOffset
        : doc.scrollTop;
      if (isReverse) {
        offset = scrollTop;
      } else {
        offset = calculateTopPosition(el) +
                    (el.offsetHeight - scrollTop - window.innerHeight);
      }
    } else if (isReverse) {
      offset = el.parentNode.scrollTop;
    } else {
      offset = el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight;
    }

    if (offset < Number(threshold)) {
      // eslint-disable-next-line no-use-before-define
      detachScrollListener();
      // Call loadMore after detachScrollListener to allow for non-async loadMore functions
      if (typeof loadMore === 'function') {
        loadMore((pageLoaded += 1));
      }
    }
  };

  const mousewheelListener = (e) => {
    // Prevents Chrome hangups
    // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
    if (e.deltaY === 1) {
      e.preventDefault();
    }
  };

  const detachScrollListener = () => {
    let scrollEl = window;
    if (useWindow === false) {
      scrollEl = scrollComponent?.parentNode;
    }

    scrollEl?.removeEventListener(
      'scroll',
      scrollListener,
      useCapture,
    );
    scrollEl?.removeEventListener(
      'resize',
      scrollListener,
      useCapture,
    );
  };

  const detachMousewheelListener = () => {
    let scrollEl = window;
    if (useWindow === false) {
      scrollEl = scrollComponent?.parentNode;
    }

    scrollEl?.removeEventListener(
      'mousewheel',
      mousewheelListener,
      useCapture,
    );
  };

  const attachScrollListener = () => {
    if (!hasMore) {
      return;
    }
    let scrollEl = window;
    if (useWindow === false) {
      scrollEl = scrollComponent?.parentNode;
    }
    scrollEl?.addEventListener(
      'mousewheel',
      mousewheelListener,
      useCapture,
    );
    scrollEl?.addEventListener(
      'scroll',
      scrollListener,
      useCapture,
    );
    scrollEl?.addEventListener(
      'resize',
      scrollListener,
      useCapture,
    );

    if (initialLoad) {
      scrollListener();
    }
  };

  useEffect(() => {
    pageLoaded = pageStart;
    attachScrollListener();
  }, []);

  useEffect(() => {
    if (hasMore) {
      attachScrollListener();
    }
    return () => {
      detachScrollListener();
      detachMousewheelListener();
    };
  }, [loadMore]);

  props.ref = (node) => {
    scrollComponent = node;
    if (ref) {
      ref(node);
    }
  };

  const childrenArray = [children];
  if (hasMore) {
    if (loader) {
      if (isReverse) childrenArray.unshift(loader);
      else childrenArray.push(loader);
    }
  }
  return React.createElement(element, props, childrenArray);
};

InfiniteLoader.propTypes = propTypes;
InfiniteLoader.defaultProps = defaultProps;

export default InfiniteLoader;
