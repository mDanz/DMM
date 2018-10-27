import React from 'react'
import PropTypes from 'prop-types'

import './HeaderBar.css'

import ContentJson from './HeaderBar.json'

const HeaderBar = (props) => {
  const {
    className,
    background,
    children,
    ...attributes
  } = props;

  const classes = 'header-bar ';
  const wrapperClasses = 'header-bar-wrapper '
                        + (className !== undefined ? className : '');
  const backgroundClasses = 'header-bar-background ';

  return (
    <div {...attributes} className={wrapperClasses} >
      { background !== undefined
        ? <img src={background} alt={ContentJson.alt} className={backgroundClasses}/>
        : null
      }
      <div className={classes}>
        {children}
      </div>
    </div>
  );
};

HeaderBar.propTypes = {
  className: PropTypes.string,
  background: PropTypes.string,
};

export default HeaderBar
