module.exports = {
  siteMetadata: {
    title: `Michal Piechowiak`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/content`,
				name: 'pages'
			}
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              // Remove the default behavior of adding a link to each
              // image.
              linkImagesToOriginal: false,
            },
          },
        ]
			}
		},
    `gatsby-transformer-sharp`,
	],
}
