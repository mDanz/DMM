import React from 'react'
import PropTypes from 'prop-types'
import PageFrame, { PageFrameTypes } from './PageFrame/PageFrame'

import './Page.css'

const Page = (props) => {
  const {
    tag: Tag,
    className,
    isCentered,
    isHalfHeight,
    isHalfWidth,
    isMultiPage,
    background,
    topFrame,
    bottomFrame,
    zIndex,
    ...attributes
  } = props;

  const classes = 'page '
                + (isHalfHeight ? 'page--halfHeight ' : '')
                + (isHalfWidth ? 'page--halfWidth ' : '')
                + (isMultiPage ? 'page--multiPage ' : '')
                + (isCentered ? 'page--isCentered ' : '')
                + (className !== undefined ? className : '');

  return (
    <Tag {...attributes}
      className={classes}
      style={{
        zIndex: zIndex,
        backgroundImage: "url(" + background + ")",
      }}
    >
      { topFrame !== undefined
        ? <PageFrame
            background={topFrame}
            type={PageFrameTypes.Top}
            zIndex={zIndex-8}
          />
        : null
      }
      { bottomFrame !== undefined
        ? <PageFrame
            background={bottomFrame}
            type={PageFrameTypes.Bottom}
            zIndex={zIndex-8}
          />
        : null
      }
      {props.children}
    </Tag>
  );
};

Page.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  isCentered: PropTypes.bool,
  isHalfHeight: PropTypes.bool,
  isMultiPage: PropTypes.bool,
  background: PropTypes.string,
  topFrame: PropTypes.string,
  bottomFrame: PropTypes.string,
  zIndex: PropTypes.number,
};

Page.defaultProps = {
  tag: 'section',
  zIndex: 0,
}



export default Page
