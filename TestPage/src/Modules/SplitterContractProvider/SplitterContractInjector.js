import React from 'react';
import SplitHistoryContainer from './Containers/SplitHistoryContainer'

function canAccessContractData(WrappedComponent, Container) {
  const Wrapper = (props) => (
    <Container
      wrappedComponent={WrappedComponent}
      {...props}
    />
  );

  return Wrapper;
}

export function canAccessSplitHistory(WrappedComponent) {
  return canAccessContractData(WrappedComponent, SplitHistoryContainer);
}
