// from src/utils/colors.ts
const bgColor = '#121212';
const primaryColor = '#F48FB1';

module.exports = {
    pathPrefix: '/algorifun',
    siteMetadata: {
        title: `Algorifun`,
        description: `A collection of animated algorithms`,
        author: `@ksmai`,
        navigationLinks: [{
            id: 'home',
            name: 'Home',
            to: '/',
        }, {
            id: 'link-1b',
            name: 'Link 1b',
            to: '/',
        }, {
            id: 'group',
            name: 'Group',
            children: [
                { id: 'group-2a', name: 'Link 2a', to: '/' },
                { id: 'group-2b', name: 'Link 2b', to: '/' },
            ],
        }],
    },
    plugins: [
        `gatsby-plugin-emotion`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Algorifun`,
                short_name: `Algorifun`,
                start_url: `/`,
                background_color: bgColor,
                theme_color: primaryColor,
                display: `minimal-ui`,
                icon: `src/images/logo_512x512.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`,
    ],
};
