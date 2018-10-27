import React from 'react';
import { NotificationContextTypes } from './NotificationProvider';

export default function canDispatchNotification(WrappedComponent) {
  const Wrapper = (props, { dispatchNotification }) => (
    <WrappedComponent
      dispatchNotification={ dispatchNotification }
      { ...props }
    />
  );

  Wrapper.contextTypes = NotificationContextTypes;

  return Wrapper;
}
