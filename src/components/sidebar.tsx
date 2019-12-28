import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

import Logo from 'components/logo';
import SiteNavigation from 'components/site-navigation';

const Container = styled.aside`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const SiteDescription = styled.small`
    text-align: center;
    display: block;
`;

const Header = styled.header`
    padding: 32px 24px 0;
    flex: 0 0 auto;
    margin-bottom: 24px;
`;

const Sidebar = ({ ...props }) => {
    const data = useStaticQuery(graphql`
        query SiteDescriptionQuery {
            site {
                siteMetadata {
                    description
                }
            }
        }
    `);
    const description = data.site.siteMetadata.description;

    return (
        <Container {...props} >
            <Header>
                <Link to="/">
                    <Logo />
                </Link>
                <SiteDescription>{description}</SiteDescription>
            </Header>
            <SiteNavigation />
        </Container>
    );
};

export default Sidebar;
