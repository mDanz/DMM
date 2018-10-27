import React from 'react';
import IsAdminContainer from './Containers/IsAdminContainer'

function canAccessContractData(WrappedComponent, Container) {
  const Wrapper = (props) => (
    <Container
      wrappedComponent={WrappedComponent}
      {...props}
    />
  );

  return Wrapper;
}

export function canAccessIsAdmin(WrappedComponent) {
  return canAccessContractData(WrappedComponent, IsAdminContainer);
}
