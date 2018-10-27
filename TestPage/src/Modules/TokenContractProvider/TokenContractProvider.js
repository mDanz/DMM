import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import * as Token from '../Middleware/Dmm/Token'
import * as Web3Wrapper from '../Middleware/Web3Wrapper'
import * as TokenContractAction from './TokenContractActions'
import {
  canAccessNetworkState,
  canAccessAccounts,
} from '../DmmContractProvider/DmmContractInjector'

import GlobalJson from '../../Global.json'


class TokenContractProvider extends Component {

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
    setInterval(async () => this.updatePercentage(), 3000);
  }

  async updatePercentage() {
    if (!this.props.networkState.isConnectedToNetwork()
        || this.props.accounts.defaultAccount === '') {
			this.resetPercentage();
      return;
		}

		let percentage = await Token.getPercentage();
		if (this.props.contractStore.getState().percentage !== percentage) {
			this.props.contractStore.dispatch(PCContractAction.updatePercentage(percentage));
		}
	}

  resetPercentage() {
    if (this.props.contractStore.getState().percentage !== 0) {
      this.props.contractStore.dispatch(TokenContractAction.updatePercentage(0));
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
                  TokenContractProvider))
