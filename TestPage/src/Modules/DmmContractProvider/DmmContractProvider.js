import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import _ from 'underscore'
import * as Dmm from '../Middleware/Dmm/Dmm'
import * as Web3Wrapper from '../Middleware/Web3Wrapper'
import * as DmmContractAction from './DmmContractActions'

import ContentJson from './DmmContractProvider.json'
import GlobalJson from '../../Global.json'


class DmmContractProvider extends Component {

  static propTypes = {
    contractStore: PropTypes.object,
  }

  constructor (props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount () {
    if (document.readyState === 'loading') {
      window.addEventListener('load', this.handleLoad);
    } else {
      this.handleLoad();
    }
  }

  async handleLoad () {
    this.startSpinners();
    this.setRefAddress();

    await Promise.all([this.updateAccounts(), this.updateNetworkState()]);

    setInterval(async () => this.updateAllDividends(), 3000);
    setInterval(async () => this.updateBadges(), 3000);
    setInterval(async () => this.updateOthers(), 3000);
    setInterval(async () => this.updateAccounts(), 1000);
    setInterval(async () => this.updateNetworkState(), 1000);

    this.setOnContractStart();
    this.setOnBadgeBuy();
    this.setOnRefererSet();
    this.setOnWithdraw();
    this.setOnLegacyWithdraw();
  }

  startSpinners () {
    spinnerService.showGroup(GlobalJson.badgesSpinnerGroup);
  }

  async updateOthers () {
    this.updateReferralLink();
    this.updateContractBalance();
    this.updateStartTime();
  }

  async updateNetworkState () {
      await this.updateConnectionState();
      await this.updateNetwork();
      await this.updateContractStatus();
  }

  async updateAccounts () {
    this.updateDefaultAccount();
  }

  async updateAllDividends () {
    // this.updateDividends();  //// TODO: uncomment for relaunch
    this.updateLegacyDividends();
  }

  async updateDividends () {
    this.updateSplitProfit();
    this.updateFlipProfit();
    this.updateWaypointProfit();
  }

  setOnWithdraw () {
		Dmm.setOnWithdraw( (eventType, receiver, amount, defaultAccount) => this.props.dispatchNotification(eventType, {receiver, amount, defaultAccount}) );
	}

  setOnLegacyWithdraw () {
		LegacyDmm.setOnWithdraw( (eventType, receiver, amount, defaultAccount) => this.props.dispatchNotification(eventType, {receiver, amount, defaultAccount}) );
	}

  setOnBadgeBuy () {
    Dmm.setOnBadgeBuy( (eventType, badgeId, buyer, price, newPrice, defaultAccount) => this.props.dispatchNotification(eventType, {badgeId, buyer, price, newPrice, defaultAccount}) );
  }

  setOnRefererSet () {
    Dmm.setOnRefererSet((eventType, user, referer) => this.props.dispatchNotification(eventType, {user, referer}));
  }

	setOnContractStart () {
		Dmm.setOnContractStart((eventType) => this.props.dispatchNotification(eventType, null));
	}

  setRefAddress () {
		let refAddress = this.props.refAddress;
		if (this.props.contractStore.getState().accounts.refAddress !== refAddress){
			this.props.contractStore.dispatch(DmmContractAction.updateRefAddress(refAddress));
		}
	}

  async updateConnectionState () {
		let isConnected = await Web3Wrapper.isConnected();
		if (this.props.contractStore.getState().networkState.isConnected !== isConnected){
			this.props.contractStore.dispatch(DmmContractAction.updateConnectionState(isConnected));
		}
	}

  async updateNetwork () {
    if (!this.props.contractStore.getState().networkState.isConnected) {
			this.resetNetwork();
      return;
		}

		let isExpectedNetwork = await Web3Wrapper.isExpectedNetwork();
		if (this.props.contractStore.getState().networkState.isExpectedNetwork !== isExpectedNetwork){
			this.props.contractStore.dispatch(DmmContractAction.updateNetwork(isExpectedNetwork));
		}
	}

  resetNetwork () {
    if (this.props.contractStore.getState().networkState.isExpectedNetwork !== false) {
      this.props.contractStore.dispatch(DmmContractAction.updateNetwork(false));
    }
    return;
  }

  async updateContractStatus () {
    if (!this.isConnectedToNetwork()) {
			this.resetContractStatus();
      return;
		}

		let contractStatus = await Dmm.getContractStatus();
		if (this.props.contractStore.getState().contractData.contractStatus !== contractStatus) {
			this.props.contractStore.dispatch(DmmContractAction.updateContractStatus(contractStatus));
		}
	}

  resetContractStatus () {
    if (this.props.contractStore.getState().contractData.contractStatus !== DmmContractStatus.Unknown) {
      this.props.contractStore.dispatch(DmmContractAction.updateContractStatus(DmmContractStatus.Unknown));
    }
    return;
  }

  async updateDefaultAccount () {
    if (!this.isConnectedToNetwork()) {
			this.resetDefaultAccount();
      return;
		}

		let defaultAccount = await Web3Wrapper.getDefaultAccount();
		if (this.props.contractStore.getState().accounts.defaultAccount !== defaultAccount) {
			this.props.contractStore.dispatch(DmmContractAction.updateDefaultAccount(defaultAccount));
		}
	}

  resetDefaultAccount () {
    if (this.props.contractStore.getState().accounts.defaultAccount !== '') {
      this.props.contractStore.dispatch(DmmContractAction.updateDefaultAccount(''));
    }
    return;
  }

	async updateBadges () {
    if (!this.isConnectedToNetwork()
        || this.props.contractStore.getState().contractData.contractStatus !== DmmContractStatus.Running
        || this.props.contractStore.getState().accounts.defaultAccount === '') {
			this.resetBadges();
      return;
		}

		let badges = await Dmm.getBadges();
		this.updateBadgesInStore(badges);
	}

  resetBadges () {
    if (this.props.contractStore.getState().contractData.badges !== []) {
      this.props.contractStore.dispatch(DmmContractAction.updateBadges([]));
    }
    return;
  }

  updateBadgesInStore (badges) {
    let currentBadges = this.props.contractStore.getState().contractData.badges;
    if ( badges.length === 0
      || currentBadges.length > badges.length ) {
      return;
    }
    if (!_.isEqual(currentBadges, badges)) {
			this.props.contractStore.dispatch(DmmContractAction.updateBadges(badges));
      spinnerService.hideGroup(GlobalJson.badgesSpinnerGroup);
		}
  }

  async updateSplitProfit () {
    if (!this.isConnectedToNetwork()
        || this.props.contractStore.getState().accounts.defaultAccount === ''
      ) {
      this.resetSplitProfit();
      return;
    }

    let defaultAccount = this.props.contractStore.getState().accounts.defaultAccount;
    let splitProfit = await Dmm.getSplitProfit(defaultAccount);
    if (this.props.contractStore.getState().contractData.splitProfit !== splitProfit) {
      this.props.contractStore.dispatch(DmmContractAction.updateSplitProfit(splitProfit));
    }
  }

  resetSplitProfit () {
    if (this.props.contractStore.getState().contractData.splitProfit !== 0) {
      this.props.contractStore.dispatch(DmmContractAction.updateSplitProfit(0));
    }
    return;
  }


  async updateFlipProfit () {
    if (!this.isConnectedToNetwork()
        || this.props.contractStore.getState().accounts.defaultAccount === ''
      ) {
      this.resetFlipProfit();
      return;
    }

    let defaultAccount = this.props.contractStore.getState().accounts.defaultAccount;
    let flipProfit = await Dmm.getFlipProfit(defaultAccount);
    if (this.props.contractStore.getState().contractData.flipProfit !== flipProfit) {
      this.props.contractStore.dispatch(DmmContractAction.updateFlipProfit(flipProfit));
    }
  }

  resetFlipProfit () {
    if (this.props.contractStore.getState().contractData.dividends !== 0) {
      this.props.contractStore.dispatch(DmmContractAction.updateFlipProfit(0));
    }
    return;
  }


  async updateWaypointProfit () {
    if (!this.isConnectedToNetwork()
        || this.props.contractStore.getState().accounts.defaultAccount === ''
      ) {
      this.resetWaypointProfit();
      return;
    }

    let defaultAccount = this.props.contractStore.getState().accounts.defaultAccount;
    let waypointProfit = await Dmm.getWaypointProfit(defaultAccount);
    if (this.props.contractStore.getState().contractData.waypointProfit !== waypointProfit) {
      this.props.contractStore.dispatch(DmmContractAction.updateWaypointProfit(waypointProfit));
    }
  }

  resetWaypointProfit () {
    if (this.props.contractStore.getState().contractData.dividends !== 0) {
      this.props.contractStore.dispatch(DmmContractAction.updateWaypointProfit(0));
    }
    return;
  }


  async updateLegacyDividends () {
    if (!this.isConnectedToNetwork()
        || this.props.contractStore.getState().accounts.defaultAccount === ''
      ) {
			this.resetLegacyDividends();
      return;
		}

    let defaultAccount = this.props.contractStore.getState().accounts.defaultAccount;
		let legacyDividends = await LegacyDmm.getBalanceDivis(defaultAccount);
		if (this.props.contractStore.getState().contractData.legacyDividends !== legacyDividends) {
			this.props.contractStore.dispatch(DmmContractAction.updateLegacyDividends(legacyDividends));
		}
  }

  resetLegacyDividends () {
    if (this.props.contractStore.getState().contractData.legacyDividends !== 0) {
      this.props.contractStore.dispatch(DmmContractAction.updateLegacyDividends(0));
    }
    return;
  }

  async updateContractBalance () {
    if (!this.isConnectedToNetwork()
        || this.props.contractStore.getState().accounts.defaultAccount === '') {
			this.resetContractBalance();
      return;
		}

		let contractBalance = await Dmm.getBalanceContract();
		if (this.props.contractStore.getState().contractData.contractBalance !== contractBalance) {
			this.props.contractStore.dispatch(DmmContractAction.updateContractBalance(contractBalance));
		}
	}

  resetContractBalance () {
    if (this.props.contractStore.getState().contractData.contractBalance !== 0) {
      this.props.contractStore.dispatch(DmmContractAction.updateContractBalance(0));
    }
    return;
  }

  async updateStartTime () {
    if (!this.isConnectedToNetwork()
        || this.props.contractStore.getState().accounts.defaultAccount === '') {
			this.resetStartTime();
      return;
		}
		const startTime = await Dmm.getStartTime();
		if (this.props.contractStore.getState().contractData.startTime !== startTime) {
			this.props.contractStore.dispatch(DmmContractAction.updateStartTime(startTime));
		}
	}

  resetStartTime () {
    if (this.props.contractStore.getState().contractData.startTime !== -1) {
      this.props.contractStore.dispatch(DmmContractAction.updateContractBalance(-1));
    }
    return;
  }

  async updateReferralLink () {
    if (!this.isConnectedToNetwork()
        || this.props.contractStore.getState().accounts.defaultAccount === '') {
			this.resetReferralLink();
      return;
		}

		let referralLink = await ReferralLink.getReferralLink();
		if (this.props.contractStore.getState().referralLink !== referralLink) {
			this.props.contractStore.dispatch(DmmContractAction.updateReferralLink(referralLink));
		}
	}

  resetReferralLink () {
    if (this.props.contractStore.getState().referralLink !== '') {
      this.props.contractStore.dispatch(DmmContractAction.updateReferralLink(''));
    }
    return;
  }

  isConnectedToNetwork () {
    let isConnected = this.props.contractStore.getState().networkState.isConnected;
    if ( !isConnected ) {
      // console.error(ContentJson.notConnectedErrorMsg);
      return false;
    }

    let isExpectedNetwork = this.props.contractStore.getState().networkState.isExpectedNetwork;
    if( !isExpectedNetwork ) {
      // console.error(ContentJson.unexpectedNetworkErrorMsg);
      return false;
    }

    return true;
  }


  render() {
    return (
      <Provider store={this.props.contractStore}>
        <Fragment>
          {this.props.children}
        </Fragment>
      </Provider>
    );
  }
};

export default canDispatchNotification(DmmContractProvider)
