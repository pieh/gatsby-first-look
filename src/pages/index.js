import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

// import Overdrive from 'react-overdrive'
// import Overdrive from '../components/overdrive'
import Overdrive from '../components/keepInDom/mountMove'
import ContentPageTransition from '../components/keepInDom/contentPageTransition';

import ResponsiveImage from '../components/responsiveImage';
// import '../css/index.css'; // add some style if you want!
// import {container} from '../styles/common.module.scss'
import {page,content,container} from '../styles/layout.module.scss'
import {title} from '../styles/common.module.scss'

import Header from '../components/header'

import { PAGE_TRANSITION_DURATION, ZINDEX_CONTENT, ZINDEX_HEADER_FEATURED_IMAGE, ZINDEX_HEADER_TITLE } from '../config'


export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <div className={page}>
      <Header/>
      <ContentPageTransition zIndex={ZINDEX_CONTENT} id="content" duration={PAGE_TRANSITION_DURATION} className={content}>
        <div className={container}>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            // console.log(post.frontmatter.thumb)
            return (

              <div className="blog-post-preview" key={post.id}>

                  <Overdrive zIndex={ZINDEX_HEADER_TITLE} id={post.id + '_title'} duration={PAGE_TRANSITION_DURATION}>
                    <Link to={post.frontmatter.path}>
                      <div style={{overflow: 'hidden'}}>
                        <h1 className={title}>
                          {post.frontmatter.title}
                        </h1>
                      </div>
                    </Link>
                  </Overdrive>

                <h2>{post.frontmatter.date}</h2>
                <p>{post.excerpt}</p>
                { post.frontmatter.thumb && post.frontmatter.thumb.childImageSharp && (
                  <Overdrive zIndex={ZINDEX_HEADER_FEATURED_IMAGE} id={post.id + '_featured_image'} duration={PAGE_TRANSITION_DURATION}>
                    <Link to={post.frontmatter.path}>
                      <ResponsiveImage {...post.frontmatter.thumb.childImageSharp.responsiveSizes}/>
                    </Link>
                  </Overdrive>
                ) }
              </div>
            )
          })}
         </div>
       </ContentPageTransition>
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            thumb {
              id,
              absolutePath
              childImageSharp {
                id
                responsiveSizes {
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`
