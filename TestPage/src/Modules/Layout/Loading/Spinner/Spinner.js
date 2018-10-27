import React, { Component, Fragment, createRef } from 'react'
import { spinnerService } from './SpinnerService'
import PropTypes from 'prop-types'

class Spinner extends Component {

  static propTypes = {
    SpinnerComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    name: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    show: PropTypes.bool,
    isScreenCover: PropTypes.bool,
    text: PropTypes.string,
    isFading: PropTypes.bool,
    hasSkipButton: PropTypes.bool,
  }

  constructor(props, context) {
    super(props, context);
    this.spinnerComponentRef = createRef();
    this.state = {
      show: this.props.hasOwnProperty('show')
            ? this.props.show
            : false,
      isFading: false,
    };

    if (this.props.hasOwnProperty('spinnerService')) {
      this.spinnerService = this.props.spinnerService;
    } else {
      this.spinnerService = spinnerService;
    }

    this.spinnerService._register(this);
  }


  componentWillUnmount() {
    this.spinnerService._unregister(this);
  }

  get name() {
    return this.props.name;
  }

  get group() {
    return this.props.group;
  }

  get show() {
    return this.state.show;
  }

  set show(show) {
    if (!show) {
      this.fadeSpinner();
    }
    else {
      this.setState({ show });
    }
  }

  fadeSpinner (show) {
    this.setState({isFading: true})
    setTimeout(() => {
      this.setState({ show });
    }, 2000)
  }

  render() {
    const {
      SpinnerComponent,
      name,
      group,
      show,
      text,
      children,
      isFading,
      hasSkipButton,
      isScreenCover,
      ...attributes
    } = this.props;

    const wrapperDisplayStyle = ( this.state.show
      ? {visibility: 'hidden'}
      : { animation: 'fadein 2500ms'}
    );

    return (
      <Fragment>
        {this.state.show
          ? <SpinnerComponent
              ref={this.spinnerComponentRef}
              isScreenCover={isScreenCover}
              {...attributes}
              text={text}
              isFading={isFading}
              hasSkipButton={hasSkipButton}
              onSkipClicked={() => this.show = false}
            />
          : null
        }
        <div style={wrapperDisplayStyle}>
          {children}
        </div>
      </Fragment>
    );
  }
}

export default Spinner
