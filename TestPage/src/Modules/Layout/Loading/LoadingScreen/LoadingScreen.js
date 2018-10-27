import React, { Component } from 'react';
import { spinnerService } from '../Spinner/SpinnerService'
import Spinner from '../Spinner/Spinner'

export function hasLoadingScreen(WrappedComponent, SpinnerComponent, spinnerName, spinnerGroup, loadingText, hasSkipButton = false, isScreenCover = false) {
  const Wrapper = (props) => (
    <Spinner
      SpinnerComponent={SpinnerComponent}
      show={true}
      name={spinnerName}
      group={spinnerGroup}
      isScreenCover={isScreenCover}
      text={loadingText}
      hasSkipButton={hasSkipButton}
    >
      <WrappedComponent {...props} />
    </Spinner>
  );

  return Wrapper;
}
