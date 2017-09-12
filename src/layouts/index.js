import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import withRouter from 'react-router-dom/withRouter'


import Header from '../components/header'

import './index.css'
import './animation.scss'

import {container} from '../styles/common.module.scss'
// import headerStyles from './header.module.scss'
// console.log('styles', headerStyles)
//
// const Header = () => (
//   <div
//     style={{
//       background: 'rebeccapurple',
//       marginBottom: '1.45rem',
//     }}
//   >
//     <div
//       style={{
//         margin: '0 auto',
//         maxWidth: 960,
//         padding: '1.45rem 1.0875rem',
//       }}
//     >
//       <h1 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           className={headerStyles.header}
//         >
//           GatsbyH
//         </Link>
//       </h1>
//     </div>
//   </div>
// )

class TransitionHandler extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.location.pathname === window.location.pathname
  }

  render() {
    const { children } = this.props
    return <div className="transition-container">{children}</div>
  }
}

class AnimationWrapper extends React.Component {
  render() {
    return this.props.children


    return (
      <div className="transition-group">
        <TransitionGroup>
          <CSSTransition
            classNames="example"
            timeout={{ enter: 500, exit: 500 }}
            key={this.props.location.pathname}
          >
            <TransitionHandler
              location={this.props.location}
            >
            {this.props.children}
          </TransitionHandler>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

const TemplateWrapper = ({ children, location }) => {

//   <TransitionGroup>
//     <CSSTransition
//       classNames="example"
//       timeout={{ enter: 500, exit: 500 }}
//       key={location.pathname}
//     >
//       <TransitionHandler
//         location={location}
//       >
//
//     </TransitionHandler>
//   </CSSTransition>
// </TransitionGroup>

  // return (
  // <div>
  //   <Helmet
  //     title="Gatsby Default Starter"
  //     meta={[
  //       { name: 'description', content: 'Sample' },
  //       { name: 'keywords', content: 'sample, something' },
  //     ]}
  //   />
  //   <Header />
  //         <AnimationWrapper location={location}>
  //           <div
  //             className={container}
  //           >
  //             {children()}
  //           </div>
  //       </AnimationWrapper>
  // </div>
// )
  return (
    <div>
      <Helmet
        title="Gatsby Default Starter"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      {children()}
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default withRouter(TemplateWrapper)
