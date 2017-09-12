import React from 'react';
import PropTypes from 'prop-types';

const components = {};

class MountTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inEffect: true
    };
    this.effectEnd = this.effectEnd.bind(this);
    this.hideComponentInEffect = false;
    this.isComponentMounted = false;
  }

  triggerShowEffect(prevPosition, prevElement) {

  }

  triggerHideEffect(prevPosition, prevElement) {

  }

  effectEnd() {
    this.effectTimeout = null;
    if (this.isComponentMounted) {
      this.setState({inEffect: false});
    }
    this.props.onEffectEnd && this.props.onEffectEnd();
    if (this.bodyElement) {
      window.document.body.removeChild(this.bodyElement);
      this.bodyElement = null;
    }
  }

  onShow() {
    if (this.onShowLock) {
      return;
    }

    this.onShowLock = true;

    const id = this.props.id;
    if (id) {
      if (components[id]) {
        const {prevPosition, prevElement} = components[id];
        components[id] = false;
        this.triggerShowEffect(prevPosition, prevElement);
      } else {
        this.setState({inEffect: false})
      }
    }
  }

  onHide() {
    const {id, waitForShow}  = this.props;
    // const prevElement = React.cloneElement(this.props.children);
    const prevElement = this.createElement();
    const prevPosition = this.getPosition();
    if (id) {
      components[id] = {
        prevPosition,
        prevElement
      };
    }

    this.clearEffects();
    this.triggerHideEffect(prevPosition, prevElement);

    if (id) {
      setTimeout(() => {
          components[id] = false;
      }, waitForShow);
    }
  }

  clearEffects() {
    clearTimeout(this.effectTimeout);

    if (this.effectTimeout) {
      this.effectEnd();
    }
  }

  getPosition(addOffset) {
    const node = this.element;
    const rect = node.getBoundingClientRect();
    const computedStyle = getComputedStyle(node);
    const marginTop = parseInt(computedStyle.marginTop, 10);
    const marginLeft = parseInt(computedStyle.marginLeft, 10);
    return {
      top: (rect.top - marginTop) + ((addOffset ? 1 : 0) * (window.pageYOffset || document.documentElement.scrollTop)),
      left: (rect.left - marginLeft),
      width: rect.width,
      height: rect.height,
      margin: computedStyle.margin,
      padding: computedStyle.padding,
      borderRadius: computedStyle.borderRadius,
      position: 'absolute'
    };
  }

  componentDidMount() {
    this.onShow();
    this.isComponentMounted = true;
  }

  componentDidUpdate() {
    this.onShow();
  }

  componentWillUnmount() {
    this.onHide();
    this.isComponentMounted = false;
  }

  componentWillReceiveProps() {
    this.onShowLock = false;
    this.onHide();
  }

  childProps() {
     const {id, duration, onEffectEnd, waitForShow, style, children, element, ...rest} = this.props;
     return rest
  }

  createElement(props={}) {
    const {children, element} = this.props;

    return React.createElement(
      element,
      {
        ...this.childProps(),
        ...props,
      },
      children
    )
  }

  render() {
    const {children, element, style} = this.props;

    const newStyle = {
        ...style,
        opacity: (this.hideComponentInEffect && this.state.inEffect ? 0 : 1)
    };
    const onlyChild = React.Children.only(children);

    return this.createElement({
      ref: reference => (this.element = reference),
      style: newStyle,
    })
  }
}

MountTracker.propTypes = {
    id: PropTypes.string,
    duration: PropTypes.number,
    waitForShow: PropTypes.number,
    zIndex: PropTypes.number,
    element: PropTypes.string,
    onEffectEnd: PropTypes.func
};

MountTracker.defaultProps = {
    element: 'div',
    duration: 200,
    waitForShow: 100,
    zIndex: 1
};

export default MountTracker;
