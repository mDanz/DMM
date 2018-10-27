import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createStore } from 'redux'
import DmmHeader from '../../DmmHeader/DmmHeader'
import DmmContractReducer from '../../DmmContractProvider/DmmContractReducer'
import DmmContractProvider from '../../DmmContractProvider/DmmContractProvider'
import {
  canAccessAccounts
} from '../../DmmContractProvider/DmmContractInjector'
import {
  canAccessIsAdmin
} from '../../AdminContractProvider/AdminContractInjector'
import {
  canAccessIsPC
} from '../../PCContractProvider/PCContractInjector'
import {
  canAccessPercentage
} from '../../TokenContractProvider/TokenContractInjector'
import {
  canAccessSplitHistory
} from '../../SplitterContractProvider/SplitterContractInjector'
import './DmmPage.css';

import GlobalJson from '../../../Global.json'
import ContentJson from './DmmPage.json'

const dmmContractStore = createStore(dmmContractReducer);

class DmmPage extends Component {

  this.renderSplitHistory (history) {
    return ();
  }

  render () {
    const = {
      accounts,
      splitHistory,
      isAdmin,
      isPC,
      percentage,
      ...attributes
    } = this.props;

    const role = (isAdmin
                  ? 'Admin'
                  : isPC
                    ? 'Power Changer'
                    : 'Employee');

    return (
      <DmmContractProvider
        contractStore={dmmContractStore}
      >
        <Page {...attributes}
            isCentered
            id={GlobalJson.homeLink}
        >
          <PageTitle className={mainTitleClasses} alignment={AlignmentTypes.Center} type={PageTitleTypes.Primary}>{Parser(ContentJson.title)}</PageTitle>
          <PageTitle isEmphasized alignment={AlignmentTypes.Center} type={PageTitleTypes.Secondary}>{Parser(ContentJson.mainText)}</PageTitle>
          <PageText text={'Account: ' + accounts.defaultAccount}/>
          <PageText text={'Role: ' + role}/>
          <PageText text={'Percentage: ' + percentage}/>
          {this.renderHistory(splitHistory)}
        </Page>
      </DmmContractProvider>
    );
  }
}

export default canAccessAccounts(
                canAccessIsAdmin(
                  canAccessIsPC(
                    canAccessPercentage(
                      canAccessSplitHistory(
                        withRouter(DmmPage))))))
