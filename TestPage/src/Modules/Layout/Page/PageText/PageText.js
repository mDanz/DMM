import React from 'react'
import PropTypes from 'prop-types'

import './PageText.css'

const PageText = (props) => {
  const {
    tag: Tag,
    text,
    className,
    isJustified,
    isCentered,
    isCode,
    ...attributes
  } = props;

  const classes = 'page-text '
    + (isJustified ? 'page-text--isJustified ' : '')
    + (isCentered ? 'page-text--isCentered ' : '')
    + (isCode ? 'page-text--isCode ' : '')
    + (className !== undefined ? className : '');

  return (
    <Tag {...attributes} className={classes}>
      {text}
      {props.children}
    </Tag>
  );
};

PageText.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  isJustified: PropTypes.bool,
  isCentered: PropTypes.bool,
  isCode: PropTypes.bool,
  className: PropTypes.string,
};

PageText.defaultProps = {
  tag: 'div'
};


export default PageText
