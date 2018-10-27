import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import './DotNavEntry.css'

import ContentJson from './DotNavEntry.json'


const DotNavEntry = (props) => {
  const {
    tag: Tag,
    isSelected,
    text,
    href,
    target,
    onClick,
    id,
    ...attributes
  } = props;

  const classes = 'dotNav-entry '
                + (isSelected ? 'dotNav-entry--selected ' : '');

  return (
    <Tag data-tip data-for={ContentJson.tooltipId + id} {...attributes} className={classes} onClick={onClick}>
  		<a href={href} target={target}>{text}</a>
      <ReactTooltip
        id={ContentJson.tooltipId + id}
        place='right'
        delayHide={500}
        effect='solid'
      >
        {text}
      </ReactTooltip>
    </Tag>
  );
};

DotNavEntry.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  isSelected: PropTypes.bool,
  toolTip: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.number,
};

DotNavEntry.defaultProps = {
  tag: 'li',
}

export default DotNavEntry
