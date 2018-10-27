import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Scrollspy from 'react-scrollspy'

import './DotNav.css'


class DotNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelected: 0,
    };
  }

  onEntryClicked (newSelected: number) {
    setTimeout( function() {
      this.setState({currentSelected: newSelected});
    }.bind(this), this.props.transitionDelay);
  }

  renderChildren (children) {
    return (
      React.Children.map(this.props.children,
        (child, index) => this.updateChild(child, index)
      )
    );
  }

  updateChild (child, index) {
    return (
      React.cloneElement(child, {
        id: index,
        onClick: this.onEntryClicked.bind(this, index),
        isSelected: this.state.currentSelected === index ? true : false,
      })
    );
  }

  onScrollspyUpdate (element) {
    //console.log(element);
    this.onEntryClicked(this.getIndexOfElement(element));
  }

  getIndexOfElement (element) {
    if (element === undefined) {
      console.warn('Element was undefined in DotNav!');
      return null;
    }
    return this.props.spyOnItems.indexOf(element.id);
  }

  render () {
    const {
      isFixed,
      isVertical,
      spyOnItems,
      offset,
      children,
      transitionDelay,
      ...attributes
    } = this.props;

    const classes = 'dotNav dotNav--scaleup '
                  + (isFixed ? 'dotNav--fixed ' : '')
                  + (isVertical ? 'dotNav--vertical ' : '');
    const wrapperClasses = (isVertical ? 'dotNav--vertical-wrapper ' : '');

    return (
      <div {...attributes} className={classes}>
        <div className={wrapperClasses}>
    			<Scrollspy items={spyOnItems} offset={offset} onUpdate={el => this.onScrollspyUpdate(el)}>
            {this.renderChildren(children)}
    			</Scrollspy>
        </div>
      </div>
    );
  }
}


DotNav.propTypes = {
  isVertical: PropTypes.bool,
  spyOnItems: PropTypes.arrayOf(PropTypes.string),
  offset: PropTypes.number,
  transistionDelay: PropTypes.number,
};


export default DotNav
