import React from 'react'
import PropTypes from 'prop-types'

import './ParallaxWrapper.css'

const ParallaxWrapper = (props) => {
  const {
    tag: Tag,
    className,
    ...attributes
  } = props;

  const classes = 'parallax '
                + (className !== undefined ? className : '');

  return (
    <Tag {...attributes} className={classes}>
      {props.children}
    </Tag>
  );
};

ParallaxWrapper.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
};

ParallaxWrapper.defaultProps = {
  tag: 'div'
};


export default ParallaxWrapper
