import React, {Component} from 'react'
import Link from 'gatsby-link'

import {header, title} from '../styles/header.module.scss'
import {container} from '../styles/common.module.scss'



class Header extends Component {
  renderImage() {
    return null
  }

  renderTitle() {
    return null
  }

  render() {
    return (
      <div className={header}>
        <div className={container}>
          <Link
                    to="/"
                    className={title}
                  >
          Title
        </Link>
        {this.props.children}
        </div>
      </div>
    )
  }
}

export default Header
