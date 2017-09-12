import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM  from 'react-dom';

import prefix from './prefix';
import MountTracker from './mountTracker';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

class ContentPageTransition extends MountTracker {
  triggerShowEffect(prevPosition, prevElement) {
    const {duration, zIndex} = this.props;

    const offset = (window.pageYOffset || document.documentElement.scrollTop) + (window.innerHeight);

    this.setState({inEffect: true});
    const nextPosition = this.getPosition(true);

    const delta = offset - nextPosition.top;

    this.defaultStyle = this.element.style;

    if (getComputedStyle(this.element).position === 'static') {
      this.element.style.position = 'relative';
    }

    this.element.style.zIndex = zIndex;
    this.element.style.transform = `translateY(${delta}px)`;

    this.effectTimeout = setTimeout(() => {
      this.element.style.transition = `transform ${duration / 1000}s`;
      this.element.style.transform = `translateY(0)`;
      this.effectTimeout = setTimeout(this.effectEnd, duration);
    }, 0);
  }

  effectEnd() {
    super.effectEnd();
    if (this.defaultStyle) {
      this.element.style = this.defaultStyle;
      this.defaultStyle = null;
    }
  }

  triggerHideEffect(prevPosition, prevElement) {
    const {duration} = this.props;

    const clone = React.cloneElement(prevElement, {
      key: '1',
      style: prefix({
        ...prevPosition,
        // transition: `opacity ${duration / 1000}s`,
        // opacity: 0
      })
    })

    const bodyElement = document.createElement('div');
    window.document.body.appendChild(bodyElement);
    this.bodyElement = bodyElement;
    renderSubtreeIntoContainer(this, clone, bodyElement);

    // this.element.style.transform = `translateY(${delta}px)`;
    bodyElement.style.transition = `opacity ${duration / 1000}s`;

    this.effectTimeout = setTimeout(this.effectEnd, duration);
    this.effectTimeout = setTimeout(() => {
      bodyElement.style.opacity = `0`;
      this.effectTimeout = setTimeout(this.effectEnd, duration);
    }, 0);

    // this.effectTimeout = setTimeout(this.effectEnd, duration);
  }
}

ContentPageTransition.propTypes = {
    id: PropTypes.string,
    duration: PropTypes.number,
    waitForShow: PropTypes.number,
    element: PropTypes.string,
    onEffectEnd: PropTypes.func
};

ContentPageTransition.defaultProps = {
    element: 'div',
    duration: 200,
    waitForShow: 100
};

export default ContentPageTransition;
