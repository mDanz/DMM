import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import './PageButton.css'

import * as ContentJson from './PageButton.json'


import Arrow_Down_Orange from '../../../../../media/images/icons/arrow_down_orange.svg'

export const PageButtonStyle = {
  Down:     'Down',
  Normal:   'Normal',
}

class PageButton extends Component {
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

  getButtonStyle (style: string) {
    switch (style) {
      case PageButtonStyle.Down:
        return 'page-button--down '
      case PageButtonStyle.Normal:
      default:
        return 'page-button--normal '
    }
  }

  render () {
    const {
      tag: Tag,
      id,
      className,
      text,
      href,
      target,
      isDisabled,
      onClick,
      buttonStyle,
      tooltip,
      ...attributes
    } = this.props;

    const classes = 'page-button '
                  + this.getButtonStyle(buttonStyle)
                  + (isDisabled ? 'page-button--isDisabled ' : '')
                  + (className !== undefined ? className : '');

    return (
      <Fragment>
        <Tag data-tip data-for={id + ContentJson.tooltipId} {...attributes} className={classes} href={href} target={target} onClick={onClick}>
          {buttonStyle === PageButtonStyle.Down
            ? <img src={Arrow_Down_Orange} alt={ContentJson.arrowMissing} />
            : text
          }
          {this.props.children}
        </Tag>
        {tooltip !== undefined
          ? <ReactTooltip id={id + ContentJson.tooltipId} place="bottom" delayHide={250} effect='solid'>
              {tooltip}
            </ReactTooltip>
          : null
        }
      </Fragment>
    );
  }
}

PageButton.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  href: PropTypes.string,
  target: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  buttonStyle: PropTypes.string,
  tooltip: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
};

PageButton.defaultProps = {
  tag: 'a',
}

export default PageButton
