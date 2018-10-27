import React from 'react'
import PropTypes from 'prop-types'

import './ParallaxGroup.css'

const ParallaxGroup = (props) => {
  const {
    tag: Tag,
    className,
    ...attributes
  } = props;

  const classes = 'parallax-group '
                + (className !== undefined ? className : '');

  return (
    <Tag {...attributes} className={classes}>
      {props.children}
    </Tag>
  );
};

ParallaxGroup.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
};

ParallaxGroup.defaultProps = {
  tag: 'div'
};


export default ParallaxGroup
