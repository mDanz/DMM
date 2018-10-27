import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import * as Splitter from '../Middleware/Dmm/Splitter'
import * as Web3Wrapper from '../Middleware/Web3Wrapper'
import * as SplitterContractAction from './SplitterContractActions'
import {
  canAccessNetworkState,
  canAccessAccounts,
} from '../DmmContractProvider/DmmContractInjector'

import GlobalJson from '../../Global.json'


class SplitterContractProvider extends Component {

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
    setInterval(async () => this.updateSplitHistory(), 3000);
  }

  async updateSplitHistory() {
    if (!this.props.networkState.isConnectedToNetwork()
        || this.props.accounts.defaultAccount === '') {
			this.resetSplitHistory();
      return;
		}

		let splitHistory = await Token.getSplitHistory();
		if (this.props.contractStore.getState().splitHistory !== splitHistory) {
			this.props.contractStore.dispatch(SplitterContractAction.updateSplitHistory(splitHistory));
		}
	}

  resetSplitHistory() {
    if (this.props.contractStore.getState().percentage !== 0) {
      this.props.contractStore.dispatch(SplitterContractAction.updatePercentage(0));
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
                  SplitterContractProvider))
