import React from 'react'
import PropTypes from 'prop-types'
import HeaderBar from '../../Layout/Header/HeaderBar/HeaderBar'
import ContractStatusBar from './ContractStatusBar/ContractStatusBar'
import StatsBar from './StatsBar/StatsBar'
import ReferralBar from './ReferralBar/ReferralBar'
import { AmberContractStatus } from '../../Middleware/Amber/AmberContractStatus'
import { canAccessContractStatus } from '../../AmberContractProvider/AmberContractInjector'
import SocialMediaBar from './SocialMediaBar/SocialMediaBar'

import './GameBar.css'

import GlobalJson from '../../../Global.json'

const GameBar = (props) => {

  const {
    contractStatus,
  } = props;

  const classes = 'gameBar';
  const isInInitialState = contractStatus === AmberContractStatus.Initial;
  const isInRunningState = contractStatus === AmberContractStatus.Running;

  return (
    <HeaderBar className={classes}>
      <ContractStatusBar justification='start' status={contractStatus} networkName={GlobalJson.networkType}/>
      { isInInitialState || isInRunningState ? <StatsBar isDisabled={isInInitialState} justification='end'/> : null }
      { isInInitialState || isInRunningState ? <ReferralBar justification="end"/> : null }
      <SocialMediaBar justification="end"/>
    </HeaderBar>
  );
}

GameBar.propTypes = {
  contractStatus: PropTypes.string.isRequired,
}

export default canAccessContractStatus(GameBar)
