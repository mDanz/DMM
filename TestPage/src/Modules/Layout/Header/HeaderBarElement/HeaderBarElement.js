import React from 'react'
import PropTypes from 'prop-types'

import './HeaderBarElement.css'

function getJustificationClass (justification) {
  switch (justification) {
    case 'start':
      return 'header-bar-element--justifyContent--start ';
    case 'center':
      return 'header-bar-element--justifyContent--center ';
    case 'end':
      return 'header-bar-element--justifyContent--end ';
    default:
      return '';
  }
};

const HeaderBarElement = (props) => {
  const {
    tag: Tag,
    className,
    justification,
    ...attributes
  } = props;

  const classes = 'header-bar-element '
                + getJustificationClass(justification)
                + (className !== undefined ? className : '');

  return (
    <Tag {...attributes} className={classes}>
      {props.children}
    </Tag>
  );
};

HeaderBarElement.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  justification: PropTypes.string,
};

HeaderBarElement.defaultProps = {
  tag: 'div',
}

export default HeaderBarElement
