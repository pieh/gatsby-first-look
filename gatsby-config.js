module.exports = {
  siteMetadata: {
    title: `Michal Piechowiak`,
  },
  plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages'
			}
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: []
			}
		}
	],
}
