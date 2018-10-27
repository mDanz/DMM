import React from 'react'
import { connect } from 'react-redux'
import * as SplitterContractActions from '../SplitterContractActions'

const mapStateToProps = (state, props) => {
  return {
    splitHistory: state.splitHistory,
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps);

const SplitHistoryContainer = props => {
  const {
    wrappedComponent,
    ...attributes,
  } = props;

  return React.createElement(ConnectedContainer(wrappedComponent), attributes)
}

export default SplitHistoryContainer
