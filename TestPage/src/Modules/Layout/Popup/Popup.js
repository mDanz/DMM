import React from 'react'
import PropTypes from 'prop-types'
import Scrollbar from 'react-perfect-scrollbar'

import './Popup.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

const Popup = (props) => {
  const {
    className,
    text,
    onClose,
    children,
    ...attributes
  } = props;

  const popupClasses = 'popup '
                    + (className !== undefined ? className : '');
  const popupInnerClasses = 'popup-content ';
  const scrollClasses = 'popup-scroll ';

  return (
    <div
      {...attributes}
      className={popupClasses}
      onClick={onClose}
    >
      <div className={popupInnerClasses} onClick={e => e.stopPropagation()} >
        <Scrollbar className={scrollClasses}  onClick={e => e.stopPropagation()}>
          <div>
          {text}
          {children}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};


export default Popup
