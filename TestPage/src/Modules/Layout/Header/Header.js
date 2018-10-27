import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'

const Header = (props) => {
  const {
    tag: Tag,
    className,
    isFixed,
    ...attributes
  } = props;

  const classes = 'header '
                + (isFixed ? 'header--fixed ' : '')
                + (className !== undefined ? className : '');

  return (
    <Tag {...attributes} className={classes}>
        {props.children}
    </Tag>
  );
};

Header.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  isFixed: PropTypes.bool,
};

Header.defaultProps = {
  tag: 'div'
};


export default Header
