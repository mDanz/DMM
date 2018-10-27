import React from 'react'
import PropTypes from 'prop-types'

import './PageBlur.css'

import FrostedGlas from './img/frosted-glass-texture.jpg'

const PageBlur = (props) => {
  const {
    className,
    zIndex,
    style,
    ...attributes
  } = props;

  const classes = 'page-blur '
                + (className !== undefined ? className : '');

  return (
      <img {...attributes} className={classes} src={FrostedGlas}  style={{zIndex: zIndex, ...style}}/>
  )
};

PageBlur.propTypes = {
  className: PropTypes.string,
  zIndex: PropTypes.number,
};

export default PageBlur
