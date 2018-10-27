import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import HeaderBarText from '../../../../Layout/Header/HeaderBarText/HeaderBarText'

import './StatsBarText.css'

import ContentJson from './StatsBarText.json'


const StatsBarText = (props) => {
  const {
    text,
    frontIco,
    endIco,
    toolTip,
    id,
    ...attributes
  } = props;

  const classes = 'stats-bar-text ';
  const frontIconClasses = ' stats-bar-text-icon stats-bar-text-icon--front ';
  const endIconClasses = ' stats-bar-text-icon stats-bar-text-icon--end ';

  return (
    <Fragment>
      <HeaderBarText {...attributes} data-tip data-for={id + ContentJson.tooltipId} className={classes}>
        {frontIco ? <img src={frontIco} alt={ContentJson.alt} className={frontIconClasses} /> : null}
        {text}
        {endIco ? <img src={endIco} alt={ContentJson.alt} className={endIconClasses} /> : null}
    	</HeaderBarText>
      <ReactTooltip id={id + ContentJson.tooltipId} place="bottom" delayHide={1000} effect='solid'>
        {toolTip}
      </ReactTooltip>
    </Fragment>
  );
};

StatsBarText.propTypes = {
  text: PropTypes.string,
  frontIco: PropTypes.string,
  endIco: PropTypes.string,
  toolTip: PropTypes.string,
};


export default StatsBarText
