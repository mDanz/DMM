import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import * as PowerChangers from '../Middleware/Dmm/PowerChangers'
import * as Web3Wrapper from '../Middleware/Web3Wrapper'
import * as PCContractAction from './PCContractActions'
import {
  canAccessNetworkState,
  canAccessAccounts,
} from '../DmmContractProvider/DmmContractInjector'

import GlobalJson from '../../Global.json'


class PCContractProvider extends Component {

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
    setInterval(async () => this.updateIsPC(), 3000);
  }

  async updateIsPC () {
    if (!this.props.networkState.isConnectedToNetwork()
        || this.props.accounts.defaultAccount === '') {
			this.resetIsPC();
      return;
		}

		let flag = await PowerChangers.isPC();
		if (this.props.contractStore.getState().referralLink !== flag) {
			this.props.contractStore.dispatch(PCContractAction.updateIsPC(flag));
		}
	}

  resetIsPC () {
    if (this.props.contractStore.getState().isPC !== false) {
      this.props.contractStore.dispatch(PCContractAction.updateIsPC(false));
    }
    return;
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

export default canAccessAccounts(
                  canAccessNetworkState(
                    PCContractProvider))
