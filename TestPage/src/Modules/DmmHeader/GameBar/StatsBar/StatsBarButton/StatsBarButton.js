import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import HeaderBarButton from '../../../../Layout/Header/HeaderBarButton/HeaderBarButton'

import './StatsBarButton.css'

import ContentJson from './StatsBarButton.json'

const StatsBarButton = (props) => {
  const {
    text,
    frontIco,
    endIco,
    onClick,
    toolTip,
    id,
    ...attributes
  } = props;

  const classes = '';
  const frontIconClasses = ' stats-bar-button-icon stats-bar-button-icon--front ';
  const endIconClasses = ' stats-bar-button-icon stats-bar-button-icon--end ';

  return (
    <Fragment>
      <HeaderBarButton data-tip data-for={id + ContentJson.tooltipId} {...attributes} className={classes} onClick={onClick}>
    		{frontIco ? <img src={frontIco} alt={ContentJson.alt} className={frontIconClasses}/> : null}
        {text}
        {endIco ? <img src={endIco} alt={ContentJson.alt} className={endIconClasses}/> : null}
    	</HeaderBarButton>
      <ReactTooltip id={id + ContentJson.tooltipId} place="bottom" delayHide={1000} effect='solid'>
        {toolTip}
      </ReactTooltip>
    </Fragment>
  );
};

StatsBarButton.propTypes = {
  text: PropTypes.string,
  frontIco: PropTypes.string,
  endIco: PropTypes.string,
  onClick: PropTypes.func,
  toolTip: PropTypes.string,
  id: PropTypes.string,
};

StatsBarButton.defaultProps = {
  text: '',
}


export default StatsBarButton
