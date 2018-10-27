import React from 'react'
import PropTypes from 'prop-types'

import './HeaderBarText.css'

const HeaderBarText = (props) => {
  const {
    tag: Tag,
    className,
    text,
    hasSeperator,
    isEmphasized,
    ...attributes
  } = props;

  const classes = 'header-bar-text '
                + (isEmphasized ? 'header-bar-text--isEmphasized ' : '')
                + (hasSeperator !== undefined ? 'header-bar-text--seperator ' : '')
                + (className !== undefined ? className : '');

  return (
    <Tag {...attributes} className={classes}>
      {text}
      {props.children}
    </Tag>
  );
};

HeaderBarText.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  hasSeperator: PropTypes.bool,
  isEmphasized: PropTypes.bool,
};

HeaderBarText.defaultProps = {
  tag: 'span',
}

export default HeaderBarText
