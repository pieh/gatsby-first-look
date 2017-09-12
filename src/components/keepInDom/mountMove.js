import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM  from 'react-dom';

import MountTracker from './mountTracker';
import prefix from './prefix';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

class MountMove extends MountTracker {
  constructor(props) {
    super(props);
    this.hideComponentInEffect = true;
  }

  triggerShowEffect(prevPosition, prevElement) {
    const {duration, zIndex} = this.props;

    prevPosition.top += (window.pageYOffset || document.documentElement.scrollTop);
    const nextPosition = this.getPosition(true);
    const noTransform = 'scaleX(1) scaleY(1) translateX(0px) translateY(0px)';
    const targetScaleX = prevPosition.width / nextPosition.width;
    const targetScaleY = prevPosition.height / nextPosition.height;
    const targetTranslateX = prevPosition.left - nextPosition.left;
    const targetTranslateY = prevPosition.top - nextPosition.top;

    if (targetScaleX === 1 &&
        targetScaleY === 1 &&
        targetTranslateX === 0 &&
        targetTranslateY === 0) {
        return;
    }

    const transition = {
        transition: `transform ${duration / 1000}s, opacity ${duration / 1000}s`,
        transformOrigin: '0 0 0',
        zIndex
    };

    // const sourceStart = this.createElement({
    //   key: '1',
    //   style: prefix({
    //       ...transition,
    //       ...prevPosition,
    //       opacity: 1,
    //       transform: noTransform
    //   })
    // })

    const sourceStart = React.cloneElement(prevElement, {
        key: '1',
        style: prefix({
            ...transition,
            ...prevPosition,
            opacity: 1,
            transform: noTransform
        })
    });

    // const sourceEnd = this.createElement({
    //   key: '1',
    //   style: prefix({
    //       ...transition,
    //       ...prevPosition,
    //       margin: nextPosition.margin,
    //       opacity: 0,
    //       transform: `matrix(${1 / targetScaleX}, 0, 0, ${1 / targetScaleY}, ${-targetTranslateX}, ${-targetTranslateY})`
    //   })
    // })

    const sourceEnd = React.cloneElement(prevElement, {
        key: '1',
        style: prefix({
            ...transition,
            ...prevPosition,
            margin: nextPosition.margin,
            opacity: 0,
            transform: `matrix(${1 / targetScaleX}, 0, 0, ${1 / targetScaleY}, ${-targetTranslateX}, ${-targetTranslateY})`
        })
    });

    const targetStart = this.createElement({
        key: '2',
        style: prefix({
            ...transition,
            ...nextPosition,
            margin: prevPosition.margin,
            opacity: 0,
            transform: `matrix(${targetScaleX}, 0, 0, ${targetScaleY}, ${targetTranslateX}, ${targetTranslateY})`
        })
    });

    // const targetStart = React.cloneElement(this.props.children, {
    //     key: '2',
    //     style: prefix({
    //         ...transition,
    //         ...nextPosition,
    //         margin: prevPosition.margin,
    //         opacity: 0,
    //         transform: `matrix(${targetScaleX}, 0, 0, ${targetScaleY}, ${targetTranslateX}, ${targetTranslateY})`
    //     })
    // });

    const targetEnd = this.createElement({
        key: '2',
        style: prefix({
            ...transition,
            ...nextPosition,
            opacity: 1,
            transform: noTransform
        })
    });

    // const targetEnd = React.cloneElement(this.props.children, {
    //     key: '2',
    //     style: prefix({
    //         ...transition,
    //         ...nextPosition,
    //         opacity: 1,
    //         transform: noTransform
    //     })
    // });

    const start = <div>{sourceStart}{targetStart}</div>;
    const end = <div>{sourceEnd}{targetEnd}</div>;

    this.setState({inEffect: true});

    const bodyElement = document.createElement('div');
    window.document.body.appendChild(bodyElement);
    this.bodyElement = bodyElement;
    renderSubtreeIntoContainer(this, start, bodyElement);

    this.effectTimeout = setTimeout(() => {
        renderSubtreeIntoContainer(this, end, bodyElement);
        this.effectTimeout = setTimeout(this.effectEnd, duration);
    }, 0);
  }
}

MountMove.propTypes = {
    id: PropTypes.string.isRequired,
    duration: PropTypes.number,
    waitForShow: PropTypes.number,
    element: PropTypes.string,
    onEffectEnd: PropTypes.func
};

MountMove.defaultProps = {
    element: 'div',
    duration: 200,
    waitForShow: 100
};

export default MountMove;
