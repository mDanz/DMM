import React from 'react'
import PropTypes from 'prop-types'

import './PageLayer.css'

const PageLayer = (props) => {
  const {
    tag: Tag,
    className,
    children,
    isCentered,
    isBottomAligned,
    zIndex,
    ...attributes
  } = props;

  const classes = 'page-layer '
                + (isCentered ? 'page-layer--isCentered ' : '')
                + (isBottomAligned ? 'page-layer--isBottomAligned' : '')
                + (className !== undefined ? className : '');

  return (
    <div {...attributes}
      className={classes}
      style={{
        zIndex: zIndex,
      }}
    >
      {children}
    </div>
  );
};

PageLayer.propTypes = {
  className: PropTypes.string,
  isCentered: PropTypes.bool,
  isBottomAligned: PropTypes.bool,
  zIndex: PropTypes.number,
};

PageLayer.defaultProps = {
  zIndex: 0,
}



export default PageLayer
