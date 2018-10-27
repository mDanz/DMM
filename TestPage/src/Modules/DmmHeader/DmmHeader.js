import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Layout/Header/Header'
import GameBar from './GameBar/GameBar'

import './DmmHeader.css'

import ContentJson from './DmmHeader.json'


const DmmHeader = (props) => {
  const {
    zIndex,
    ...attributes
  } = props;

  const classes = 'dmmHeader dmmHeader-font';

  return (
    <Header isFixed {...attributes} className={classes} style={{zIndex: zIndex}}>
      <GameBar />
    </Header>
  );
};

DmmHeader.propTypes = {
  zIndex: PropTypes.number,
};



export default DmmHeader
