import React from 'react'
import { connect } from 'react-redux'
import * as DmmContractActions from '../DmmContractActions'

const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps);

const DmmContractAccountContainer = props => {
  const {
    wrappedComponent,
    ...attributes,
  } = props;

  return React.createElement(ConnectedContainer(wrappedComponent), attributes)
}

export default DmmContractAccountContainer
