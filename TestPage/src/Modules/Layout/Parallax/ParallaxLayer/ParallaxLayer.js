import React from 'react'
import PropTypes from 'prop-types'

import './ParallaxLayer.css'

export const ParallaxLayerDepthTypes = {
  DeepBack: 'DeepBack',
  Back: 'Back',
  Base: 'Base',
  Front: 'Front',
  Ui: 'Ui',
}

function getDepthClass(depth: string) {
  switch (depth) {
    case ParallaxLayerDepthTypes.DeepBack:
      return 'parallax-layer--deep '
    case ParallaxLayerDepthTypes.Back:
      return 'parallax-layer--back '
    case ParallaxLayerDepthTypes.Front:
      return 'parallax-layer--front '
    case ParallaxLayerDepthTypes.Ui:
      return 'parallax-layer--ui '
    case ParallaxLayerDepthTypes.Base:
    default:
      return 'parallax-layer--base '
  }
}

const ParallaxLayer = (props) => {
  const {
    tag: Tag,
    className,
    depth,
    background,
    ...attributes
  } = props;

  const classes = 'parallax-layer '
                + getDepthClass(depth)
                + (className !== undefined ? className : '');

  return (
    <Tag {...attributes} className={classes} style={{backgroundImage: "url(" + background + ")"}}>
      {props.children}
    </Tag>
  );
};

ParallaxLayer.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  depth: PropTypes.string,
  background: PropTypes.string,
};

ParallaxLayer.defaultProps = {
  tag: 'div'
};


export default ParallaxLayer
