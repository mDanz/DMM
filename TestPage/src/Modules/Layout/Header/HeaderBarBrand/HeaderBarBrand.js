import React from 'react'
import PropTypes from 'prop-types'
import HeaderBarElement from '../HeaderBarElement/HeaderBarElement'
import HeaderBarButton from '../HeaderBarButton/HeaderBarButton'

import './HeaderBarBrand.css'

import ContentJson from './HeaderBarBrand.json'

const HeaderBarBrand = (props) => {
  const {
    className,
    logo,
    text,
    href,
    target,
    isDisabled,
    onClick,
    ...attributes
  } = props;

  const classes = 'header-bar-brand header-bar-brand-font ';
  const fontWrapperClasses = 'header-bar-brand-font-wrapper ';

  return (
    <HeaderBarElement {...attributes} className={className}>
      <HeaderBarButton  className={classes}
                        href={href}
                        target={target}
                        isDisabled={isDisabled}
                        onClick={onClick}>
        { (logo !== undefined) ? <img src={logo} alt={ContentJson.imgAlt} /> : null}
        <div className={fontWrapperClasses}>{text}</div>
      </HeaderBarButton>
    </HeaderBarElement>
  );
};

HeaderBarBrand.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  href: PropTypes.string,
  target: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};


export default HeaderBarBrand
