import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NotificationSystem from 'react-notification-system'

import ContentJson from './NotificationProvider.json'

export const NotificationContextTypes = {
  dispatchNotification: PropTypes.func,
};

export const NotificationType = PropTypes.shape({
  title: PropTypes.string,
  message: PropTypes.string,
  level: PropTypes.string,
  position: PropTypes.string,
  action: PropTypes.func,
  dismissible: PropTypes.string,
  autoDismiss: PropTypes.bool,
  children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
})


export class NotificationProvider extends Component {

  static propTypes = {
    style: PropTypes.array,
  }

  static childContextTypes = NotificationContextTypes;
  _notificationSystem = null;

  static propTypes = {
      factory: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props);
    this.state = {
      factory: props.factory,
    };
  }

  componentDidMount () {
    this._notificationSystem = this.refs.notificationSystem;
  }

  getChildContext() {
    return {
      dispatchNotification: (eventType, payload) => this.dispatchNotification(eventType, payload)
    };
  }

  dispatchNotification (eventType: string, payload: object) {
    let notification = this.state.factory.createNotification(eventType, payload);
    if (notification === null) {
      console.warn(ContentJson.unsupportedEvent + eventType);
      return;
    }
    console.log('NotificationDispatched: ' + eventType);
    this._notificationSystem.addNotification(notification);
  }

  render() {
    const {
      style,
      children,
      ...attributes
    } = this.props;

    return (
      <div {...attributes}>
        { children }
        <NotificationSystem ref="notificationSystem" style={style} allowHTML /> {/* TODO: make html disableable*/}
      </div>
    );
  }
};
