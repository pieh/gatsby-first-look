import React from 'react'
import Helmet from 'react-helmet'
// import Overdrive from 'react-overdrive'

// import Overdrive from '../components/overdrive'
import Overdrive from '../components/keepInDom/mountMove'
import {title,featuredImage, featuredImageOverlay} from '../styles/header.module.scss'
import Header from '../components/header'
// import {container} from '../styles/common.module.scss'
import {page,content,container} from '../styles/layout.module.scss'
import ContentPageTransition from '../components/keepInDom/contentPageTransition';
import { PAGE_TRANSITION_DURATION, ZINDEX_CONTENT, ZINDEX_HEADER_FEATURED_IMAGE, ZINDEX_HEADER_TITLE } from '../config'

// import '../css/blog-post.css'; // make it pretty!

export default function Template({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { markdownRemark: post } = data // data.markdownRemark holds our post data
  return (
    <div className={page}>
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <Header>
        <Overdrive zIndex={ZINDEX_HEADER_TITLE} className={title} id={post.id + '_title'} duration={PAGE_TRANSITION_DURATION}>
          <h1>{post.frontmatter.title}</h1>
        </Overdrive>
        { post.frontmatter.thumb && post.frontmatter.thumb.childImageSharp && (
          <Overdrive zIndex={ZINDEX_HEADER_FEATURED_IMAGE} className={featuredImageOverlay} id={post.id + '_featured_image'} duration={PAGE_TRANSITION_DURATION}>
            <img className={featuredImage} {...post.frontmatter.thumb.childImageSharp.responsiveSizes} />
          </Overdrive>
        ) }
      </Header>
      <ContentPageTransition zIndex={ZINDEX_CONTENT} id="content" className={content} duration={PAGE_TRANSITION_DURATION}>
        <div className={container} dangerouslySetInnerHTML={{ __html: post.html }} />
      </ContentPageTransition>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        thumb {
          id,
          absolutePath
          childImageSharp {
            id
            responsiveSizes {
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`
