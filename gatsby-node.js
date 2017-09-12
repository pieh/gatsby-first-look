const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

	return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          frontmatter {
            date
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
    }
  }`
)
    .then(result => {
      // console.log('result', result)
      if (result.errors) {
        return Promise.reject(result.errors);
      }

			result.data.allMarkdownRemark.edges
        .forEach(({ node }) => {
          // console.log('node', node)

          createPage({
            path: node.frontmatter.path,
            component: blogPostTemplate,
            context: {
              id: node.id
            } // additional data can be passed via context
          });
        });
    });
}
