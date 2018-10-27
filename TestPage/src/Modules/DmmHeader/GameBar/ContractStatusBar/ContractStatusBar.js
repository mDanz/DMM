import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import HeaderBarElement from '../../../Layout/Header/HeaderBarElement/HeaderBarElement'
import HeaderBarText from '../../../Layout/Header/HeaderBarText/HeaderBarText'
import { AmberContractStatus } from '../../../Middleware/Amber/AmberContractStatus'

import "./ContractStatusBar.css"

import ContentJson from './ContractStatusBar.json'


import Status_Red from '../../../../../media/images/icons/status_red.svg';
import Status_Orange from '../../../../../media/images/icons/status_orange.svg';
import Status_Green from '../../../../../media/images/icons/status_green.svg';

function getLed(status: string) {
  switch (status) {
    case AmberContractStatus.Initial:
      return Status_Orange;
    case AmberContractStatus.Running:
      return Status_Green;
    case AmberContractStatus.Unknown:
    default:
      return Status_Red;
  }
}

function getTooltip(status: string, networkName: string) {
  switch (status) {
    case AmberContractStatus.Initial:
      return ContentJson.initialTooltip + networkName;
    case AmberContractStatus.Running:
      return ContentJson.runningTooltip + networkName;
    case AmberContractStatus.Unknown:
    default:
      return ContentJson.unknownTooltip;
  }
}

const ContractStatusBar = (props) => {
  const {
    status,
    networkName,
    justification,
    ...attributes
  } = props;

  const ledClasses = "contractStatusBar-statusLed ";
  const ledIcon = getLed(status);
  const tooltip = getTooltip(status, networkName);

  return (
    <HeaderBarElement {...attributes} justification={justification}>
      <HeaderBarText isEmphasized data-tip data-for={ContentJson.tooltipId}>
        <img src={ledIcon} alt={ContentJson.alt} className={ledClasses} />
      </HeaderBarText>
      <ReactTooltip id={ContentJson.tooltipId} delayHide={1000} effect='solid'>
    		{tooltip}
  		</ReactTooltip>
    </HeaderBarElement>
  );
}

ContractStatusBar.propTypes = {
	status: PropTypes.string.isRequired,
  justification: PropTypes.string,
  networkName: PropTypes.string,
}

ContractStatusBar.defaultProps = {
  networkName: 'undefined',
}

export default ContractStatusBar
