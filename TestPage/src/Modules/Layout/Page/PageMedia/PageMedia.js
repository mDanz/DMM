import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import './PageMedia.css'

import ContentJson from './PageMedia.json'

export const PageMediaTypes = {
  Image: 'Image',
  Video: 'VideoMP4',
}

export const PageMediaSizeTypes = {
  Large: 'Large',
  Medium: 'Medium',
  Small: 'Small',
}

export function getMediaType (file) {
  let lowerCaseFile = file.toLowerCase();
  if (lowerCaseFile.endsWith('.mp4')) {
    return PageMediaTypes.Video;
  }
  else {
    return PageMediaTypes.Image;
  }
}

class PageMedia extends Component {

  constructor (props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.updateVideoFrame = this.updateVideoFrame.bind(this);
    this._videoRef = React.createRef();
    this.state = {
      videoId: props.id + ContentJson.video,
      bufferId: props.id + ContentJson.buffer,
      outputId: props.id + ContentJson.output,
      canvasHeight: props.canvasHeight,
      canvasWidth: props.canvasWidth,
    }
  }

  componentDidMount () {
    if (document.readyState === 'loading') {
  		window.addEventListener('load', this.handleLoad);
		} else {
  		this.handleLoad();
		}
	}

	handleLoad () {
    if (this.props.type === PageMediaTypes.Video) {
        this.initVideo();
        requestAnimationFrame(this.updateVideoFrame);
        this._videoRef.current.play();
    }
	}

  getSizeClass (size: string) {
    switch (size) {
      case PageMediaSizeTypes.Large:
        return 'page-media--large '
      case PageMediaSizeTypes.Medium:
        return 'page-media--medium '
      case PageMediaSizeTypes.Small:
      default:
        return 'page-media--small '
    }
  }

  renderMedia (type: string, src: string, alt: string) {
    switch (type) {
      case PageMediaTypes.Image:
        return this.renderImage(src, alt)
      case PageMediaTypes.Video:
        return this.renderVideo(src, alt)
      default:
        return ContentJson.unsupportedMedia
    }
  }

  renderImage (src: string, alt: string) {
    return (
      <img src={src} alt={alt} />
    );
  }

  renderVideo (src: string, alt: string) {
    const bufferStyle = {display: 'none'};

    return (
      <Fragment>
        <video id={this.state.videoId} ref={this._videoRef} autoPlay muted loop>
          <source src={src} type={ContentJson.videoType} codecs={ContentJson.videoCodec} />
          {alt}
        </video>
        <canvas height={this.state.canvasHeight*2} width={this.state.canvasWidth} id={this.state.bufferId} style={bufferStyle}/>
        <canvas height={this.state.canvasHeight} width={this.state.canvasWidth} id={this.state.outputId}/>
      </Fragment>
    );
  }

  initVideo () {
      this._outputCanvas = document.getElementById(this.state.outputId);
      this._outputContext = this._outputCanvas.getContext('2d');
      this._width = this._outputCanvas.width;
      this._height = this._outputCanvas.height;

      this._bufferCanvas = document.getElementById(this.state.bufferId);
      this._bufferContext = this._bufferCanvas.getContext('2d');

      this._video = document.getElementById(this.state.videoId);
  }

  updateVideoFrame (video, bufferContext, outputContext, width, height) {
    this._bufferContext.drawImage(this._video, 0, 0);

    // this can be done without alphaData, except in Firefox which doesn't like it when image is bigger than the canvas
    let image = this._bufferContext.getImageData(0, 0, this._width, this._height);
    let imageData = image.data;
    let alphaData = this._bufferContext.getImageData(0, this._height, this._width, this._height).data;

    for (let i = 3; i < imageData.length; i = i + 4) {
      imageData[i] = alphaData[i-1];
    }
    this._outputContext.putImageData(image, 0, 0, 0, 0, this._width, this._height);

    requestAnimationFrame(this.updateVideoFrame);
  }

  render () {
    const {
      tag: Tag,
      className,
      type,
      src,
      alt,
      size,
      canvasWidth,
      canvasHeight,
      children,
      zIndex,
      ...attributes
    } = this.props;

    const classes = 'page-media '
                  + this.getSizeClass(size)
                  + (className !== undefined ? className : '');


    return (
      <Tag {...attributes} className={classes} style={{zIndex: zIndex}}>
        {this.renderMedia(type, src, alt)}
        {children}
      </Tag>
    );
  }

}

PageMedia.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string,
  canvasWidth: PropTypes.number,
  canvasHeight: PropTypes.number,
  zIndex: PropTypes.number,
};

PageMedia.defaultProps = {
  tag: 'div',
  canvasHeight: 800,
  canvasWidth: 800,
};

export default PageMedia
