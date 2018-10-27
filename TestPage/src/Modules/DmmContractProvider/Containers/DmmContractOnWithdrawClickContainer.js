import React from 'react'
import { connect } from 'react-redux'
import * as DmmContractActions from '../DmmContractActions'

const mapStateToProps = (state, props) => {
  return {
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onWithdrawClick: () => {
      dispatch(DmmContractActions.withdrawDividends())
    },
  }
}

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps);

const DmmContractOnWithdrawClickContainer = props => {
  const {
    wrappedComponent,
    ...attributes,
  } = props;

  return React.createElement(ConnectedContainer(wrappedComponent), attributes)
}

export default DmmContractOnWithdrawClickContainer
