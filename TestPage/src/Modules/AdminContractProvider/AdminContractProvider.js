import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import * as Admin from '../Middleware/Dmm/Admin'
import * as Web3Wrapper from '../Middleware/Web3Wrapper'
import * as AdminContractAction from './AdminContractActions'
import {
  canAccessNetworkState,
  canAccessAccounts,
} from '../DmmContractProvider/DmmContractInjector'

import GlobalJson from '../../Global.json'


class AdminContractProvider extends Component {

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
    setInterval(async () => this.updateIsAdmin(), 3000);
  }

  async updateIsAdmin() {
    if (!this.props.networkState.isConnectedToNetwork()
        || this.props.accounts.defaultAccount === '') {
			this.resetSplitHistory();
      return;
		}

		let flag = await Admin.isAdmin(this.props.accounts.defaultAccount);
		if (this.props.contractStore.getState().isAdmin !== flag) {
			this.props.contractStore.dispatch(AdminContractAction.updateIsAdmin(flag));
		}
	}

  resetIsAdmin() {
    if (this.props.contractStore.getState().isAdmin !== false) {
      this.props.contractStore.dispatch(AdminContractAction.updateIsAdmin(false));
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
                  AdminContractProvider))
