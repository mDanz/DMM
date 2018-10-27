import React from 'react'
import PropTypes from 'prop-types'

import './TimeField.css'

const TimeField = (props) => {
  const {
    tag: Tag,
    value,
    unit,
    ...attributes
  } = props;

  const classes = 'clock-timeField clock-timeField--flex clock-timeField--text';

  return (
    <Tag {...attributes} className={classes}>
      <div className="clock-timeField-value">{value}</div>
      <div className="clock-timeField-unit">{unit}</div>
    </Tag>
  );
};

TimeField.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  value: PropTypes.number,
  unit: PropTypes.string,
};

TimeField.defaultProps = {
  tag: 'div'
};


export default TimeField
