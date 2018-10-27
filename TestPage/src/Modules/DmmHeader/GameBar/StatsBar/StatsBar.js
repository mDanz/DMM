import React from 'react'
import PropTypes from 'prop-types'
import Parser from 'html-react-parser'
import HeaderBarElement from '../../../Layout/Header/HeaderBarElement/HeaderBarElement'
import StatsBarButton from './StatsBarButton/StatsBarButton'
import StatsBarText from './StatsBarText/StatsBarText'
import {
  canAccessDividends,
  canAccessLegacyDividends,
  canAccessBadges,
  canAccessAccounts,
  canAccessOnWithdrawClick,
  canAccessOnLegacyWithdrawClick, } from '../../../AmberContractProvider/AmberContractInjector'
import * as Formatters from '../../../Util/Formatters'
import * as Amber from '../../../Middleware/Amber/Amber'

import './StatsBar.css'

import ContentJson from './StatsBar.json'

import Eth from '../../../../../media/images/icons/ethereum.svg'
import Eth_Yellow from '../../../../../media/images/icons/ethereum_yellow.svg'
import Withdraw_Yellow from '../../../../../media/images/icons/withdraw_yellow.svg'
import EthTotal from '../../../../../media/images/icons/eth-total.svg'
import Flame_Yellow from '../../../../../media/images/icons/flame_yellow.svg'
import GemTotal from '../../../../../media/images/icons/gem-total.svg'

const calculateNumOfOwnedGems = (gems, defaultAccount) => {
  if (gems.length === 0) {
    return 0;
  }
  let ownedGems = gems.filter(gem => gem.owner === defaultAccount);
  return ownedGems.length;
}

const calculateTotalNumGems = (gems) => {
  return gems.length;
}

const calculateTotalPrice = (gems) => {
  if (gems.length === 0) {
    return 0.0000;
  }

  let sum = 0;
  gems.forEach(gem => sum+= gem.price);
  return sum;
}

const calculateTotalDividends = (splitProfits, flipProfits, waypointProfits) => {
  return splitProfits + flipProfits + waypointProfits;
}

const StatsBar = (props) => {
  const {
    splitProfit,
    flipProfit,
    waypointProfit,
    legacyDividends,
    badges,
    accounts,
    justification,
    onWithdrawClick,
    onLegacyWithdrawClick,
    isDisabled,
  } = props;

  const classes = 'stats-bar '
                + (isDisabled ? 'stats-bar--disabled ' : '');

  const ownedGemNumber = calculateNumOfOwnedGems(badges, accounts.defaultAccount);
  const totalGemNumber = calculateTotalNumGems(badges);
  const totalPrice = calculateTotalPrice(badges);
  const totalDividends = calculateTotalDividends(splitProfit, flipProfit, waypointProfit);


  return (
    <HeaderBarElement className={classes} justification={justification}>
      {/* //// TODO: uncomment for relaunch
      <StatsBarText
        text={Formatters.formatPriceNumber(totalPrice).toString()}
        frontIco={EthTotal}
        endIco={Eth}
        id={ContentJson.totalPriceId}
        toolTip={Parser(ContentJson.totalPriceTooltip)}
      />
      <StatsBarText
        text={totalGemNumber.toString()}
        frontIco={GemTotal}
        id={ContentJson.totalGemsId}
        toolTip={Parser(ContentJson.totalGemsTooltip)}
        hasSeperator
      />
      */}
      {/* //// TODO: uncomment for relaunch
      <StatsBarButton
        text={Formatters.formatDividenNumber(totalDividends).toString()}
        frontIco={Withdraw_Yellow}
        endIco={Eth_Yellow}
        onClick={onWithdrawClick}
        isEmphasized
        id={ContentJson.dividendsId}
        toolTip={Parser(ContentJson.dividendsTooltip)}
      />
      <StatsBarText
        text={ownedGemNumber.toString()}
        frontIco={Flame_Yellow}
        isEmphasized
        id={ContentJson.ownedGemsId}
        toolTip={Parser(ContentJson.ownedGemsTooltip)}
      />
      { legacyDividends > 0
        ? <StatsBarButton
            text={Formatters.formatDividenNumber(legacyDividends).toString()}
            frontIco={Withdraw_Yellow}
            endIco={Eth_Yellow}
            onClick={onLegacyWithdrawClick}
            isEmphasized
            id={ContentJson.legacyDividendsId}
            toolTip={Parser(ContentJson.legacyDividendsTooltip)}
          />
        : null
      }
      */}
        <StatsBarButton
            text={Formatters.formatDividenNumber(legacyDividends).toString()}
            frontIco={Withdraw_Yellow}
            endIco={Eth_Yellow}
            onClick={onLegacyWithdrawClick}
            isEmphasized
            id={ContentJson.legacyDividendsId}
            toolTip={Parser(legacyDividends > 0
                ? ContentJson.legacyDividendsTooltip
                : ContentJson.legacyDividendsTooltipNoDivis
            )}
          />
    </HeaderBarElement>
  );
}

StatsBar.propTypes = {
  justification: PropTypes.string,
  splitProfit: PropTypes.number.isRequired,
  flipProfit: PropTypes.number.isRequired,
  waypointProfit: PropTypes.number.isRequired,
  legacyDividends: PropTypes.number.isRequired,
  badges: PropTypes.arrayOf(Amber.BadgeType).isRequired,
  accounts: PropTypes.object.isRequired,
  onWithdrawClick: PropTypes.func.isRequired,
  onLegacyWithdrawClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
}

StatsBar.defaultProps = {
  justification: 'start',
}

export default  canAccessBadges(
                  canAccessAccounts(
                    canAccessOnWithdrawClick(
                      canAccessOnLegacyWithdrawClick(
                        canAccessLegacyDividends(
                          canAccessDividends(StatsBar))))))
