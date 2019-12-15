import { bgColor, primaryColor } from './src/utils/colors';

module.exports = {
    siteMetadata: {
        title: `Algorifun`,
        description: `A collection of animated algorithms`,
        author: `@ksmai`,
        navigationLinks: [{
            name: 'Home',
            to: '/',
        }, {
            name: 'Link 1b',
            to: '/',
        }, {
            name: 'Group',
            children: [
                { name: 'Link 2a', to: '/' },
                { name: 'Link 2b', to: '/' },
                { name: 'Group 2', children: [
                    { name: 'Link 3a', to: '/' },
                    { name: 'Link 3b', to: '/' },
                    { name: 'Link 4a', to: '/' },
                    { name: 'Link 5b', to: '/' },
                    { name: 'Link 6a', to: '/' },
                    { name: 'Link 7b', to: '/' },
                    { name: 'Link 8a', to: '/' },
                    { name: 'Link 9b', to: '/' },
                    { name: 'Link 10a', to: '/' },
                    { name: 'Link 11b', to: '/' },
                    { name: 'Link 12a', to: '/' },
                    { name: 'Link 13b', to: '/' },
                    { name: 'Link 14a', to: '/' },
                    { name: 'Link 15b', to: '/' },
                    { name: 'Link 16a', to: '/' },
                    { name: 'Link 17b', to: '/' },
                    { name: 'Link 18a', to: '/' },
                    { name: 'Link 19b', to: '/' },
                    { name: 'Link 20', to: '/' },
                    { name: 'Link 21b', to: '/' },
                    { name: 'Link 22a', to: '/' },
                    { name: 'Link 23b', to: '/' },
                ],
            }]
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
