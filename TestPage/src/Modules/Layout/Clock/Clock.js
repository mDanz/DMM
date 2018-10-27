import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TimeField from './TimeField/TimeField'

import './Clock.css'

import ContentJson from './Clock.json'

class Clock extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tag: props.tag,
      isCentered: props.isCentered,
      type: props.type,
      date: props.date,
      containerClasses: 'clock-container',
      clockClasses : 'clock'
              + (props.isCentered ? ' clock--isCentered' : '')
              + (props.type !== 'up' ? ' clock--count-down' : ' clock--count-up'),
      countToDate: props.date,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      distance: 0,
    }
	}

	componentDidMount () {
    this.timerId = setInterval(() => this.updateClockHandler(), 1000);
	}

  componentWillUnmount () {
    clearInterval(this.timerID);
  }

	updateClockHandler () {
    var now = new Date().getTime();
    var newDistance = this.state.countToDate.getTime() - now;
    var newDays = Math.floor(this.state.distance / (1000 * 60 * 60 * 24));
    var newHours = Math.floor((this.state.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var newMinutes = Math.floor((this.state.distance % (1000 * 60 * 60)) / (1000 * 60));
    var newSeconds = Math.floor((this.state.distance % (1000 * 60)) / 1000);
    this.setState({
      distance : newDistance,
      days : newDays,
      hours : newHours,
      minutes : newMinutes,
      seconds : newSeconds,
    });
	}

  renderTimeFields (days, hours, minutes, seconds) {
    return (
      <div className={this.state.clockClasses}>
        <TimeField value={days} unit={ContentJson.days} />
        <TimeField value={hours} unit={ContentJson.hours} />
        <TimeField value={minutes} unit={ContentJson.minutes} />
        <TimeField value={seconds} unit={ContentJson.seconds} />
      </div>
    );
  }

  render () {
		return (
      <this.state.tag className={this.state.containerClasses}>
        {(this.state.distance < 0)
          ? this.renderTimeFields(0,0,0,0)
          : this.renderTimeFields(this.state.days, this.state.hours, this.state.minutes, this.state.seconds) }
      </this.state.tag>
		);
	}
}

Clock.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  isCentered: PropTypes.bool,
  type: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};

Clock.defaultProps = {
  tag: 'div'
};


export default Clock
