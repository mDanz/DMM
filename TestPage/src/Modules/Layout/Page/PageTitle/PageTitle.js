import React from 'react'
import PropTypes from 'prop-types'
import AlignmentTypes from '../../Types/AlignmentTypes'

import './PageTitle.css'

export const PageTitleTypes = {
  Primary: 'Primary',
  Secondary: 'Secondary',
}

function getTitleType (type: string) {
  switch (type) {
    case PageTitleTypes.Primary:
      return 'page-title--primary '
    case PageTitleTypes.Secondary:
      return 'page-title--secondary '
    default:
      return '';

  }
}

function getTitleAlignment (type: string) {
  switch (type) {
    case AlignmentTypes.Center:
      return 'page-title--centered '
    case AlignmentTypes.Right:
      return 'page-title--right '
    case AlignmentTypes.Left:
    default:
      return 'page-title--left '
  }
}

const PageTitle = (props) => {
  const {
    tag: Tag,
    className,
    text,
    type,
    alignment,
    isEmphasized,
    ...attributes
  } = props;

  const classes = 'page-title '
                + getTitleType(type)
                + getTitleAlignment(alignment)
                + (isEmphasized ? 'page-title--isEmphasized ' : '')
                + (className !== undefined ? className : '');

  return (
    <Tag {...attributes} className={classes}>
      {text}
      {props.children}
    </Tag>
  );
};

PageTitle.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  type: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  alignment: PropTypes.string,
  isEmphasized: PropTypes.bool,
  className: PropTypes.string,
};

PageTitle.defaultProps = {
  tag: 'div'
};

export default PageTitle
