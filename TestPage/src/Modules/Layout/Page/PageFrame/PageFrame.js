import React from 'react'
import PropTypes from 'prop-types'

import './PageFrame.css'

import ContentJson from './PageFrame.json'

export const PageFrameTypes = {
  Top: 'Top',
  Bottom: 'Bottom',
}

function getPageFrameTypeClass (type: PageFrameTypes) {
  switch (type) {
    case PageFrameTypes.Top:
      return 'page-frame--top ';
    case PageFrameTypes.Bottom:
      return 'page-frame--bottom ';
    default:
      console.error(ContentJson.unsupportedType);
  }
}

const PageFrame = (props) => {
  const {
    className,
    background,
    type,
    zIndex,
    style,
    ...attributes
  } = props;

  const classes = 'page-frame '
                + getPageFrameTypeClass(type)
                + (className !== undefined ? className : '');

  return (
      <img src={background} alt={ContentJson.alt} {...attributes} className={classes}  style={{zIndex: zIndex, ...style}} />
  )
};

PageFrame.propTypes = {
  className: PropTypes.string,
  background: PropTypes.string,
  type: PropTypes.string,
  zIndex: PropTypes.number,
};


export default PageFrame
