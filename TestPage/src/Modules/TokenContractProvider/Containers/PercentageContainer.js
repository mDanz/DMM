import React from 'react'
import { connect } from 'react-redux'
import * as TokenContractActions from '../TokenContractActions'

const mapStateToProps = (state, props) => {
  return {
    percentage: state.percentage,
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps);

const PercentageContainer = props => {
  const {
    wrappedComponent,
    ...attributes,
  } = props;

  return React.createElement(ConnectedContainer(wrappedComponent), attributes)
}

export default PercentageContainer
