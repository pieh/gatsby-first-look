import React, { Component } from 'react'

const animatableRegistry = {

}

class Animatable extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className="header-image-wrapper" >
        {this.props.children}
      </div>
    )
  }
}

export { Animatable }
