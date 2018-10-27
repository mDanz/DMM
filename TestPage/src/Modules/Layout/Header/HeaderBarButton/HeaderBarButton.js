import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './HeaderBarButton.css'

class HeaderBarButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if (this.props.isDisabled) {
      event.preventDefault();
      return;
    }
    if (this.props.href === '#') {
      event.preventDefault();
    }
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render () {
    const {
      tag: Tag,
      className,
      text,
      href,
      target,
      isDisabled,
      onClick,
      hasSeperator,
      isEmphasized,
      ...attributes
    } = this.props;

    const classes = 'header-bar-button '
                  + (isDisabled ? 'header-bar-button--isDisabled ' : '')
                  + (isEmphasized ? 'header-bar-button--isEmphasized ' : '')
                  + (hasSeperator !== undefined ? 'header-bar-button--seperator ' : '')
                  + (className !== undefined ? className : '');

    return (
      <Tag {...attributes} className={classes} href={href} target={target} onClick={onClick}>
        {text}
        {this.props.children}
      </Tag>
    );
  }
}

HeaderBarButton.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  href: PropTypes.string,
  target: PropTypes.string,
  isDisabled: PropTypes.bool,
  isEmphasized: PropTypes.bool,
  onClick: PropTypes.func,
  hasSeperator: PropTypes.bool,
};

HeaderBarButton.defaultProps = {
  tag: 'a',
}

export default HeaderBarButton
