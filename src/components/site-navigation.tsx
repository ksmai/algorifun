import React, { useState, useCallback } from 'react';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';

import NavigationLink from './navigation-link';
import { primaryColor } from '../utils/colors';

interface PageLink {
    id: string;
    name: string;
    to: string;
};

interface PageLinkGroup {
    id: string;
    name: string;
    children: Array<PageLink | PageLinkGroup>;
}

type PageLinks = Array<PageLink | PageLinkGroup>;


const LinkList = styled.ul`
    list-style: none;
    padding: 0 0 0 24px;
    margin: 0;
`;

interface LinksProps {
    links: PageLinks;
    onOpen: (e: React.MouseEvent, name: string) => void;
    opened: { [name: string]: boolean };
}

const arrowHeadCSS = css`
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: none;
`;

const openedGroupCSS = css`
    &::after {
        ${arrowHeadCSS}
        content: "\\25BC";
    }
`;
const closedGroupCSS = css`
    &::after {
        ${arrowHeadCSS}
        content: "\\25B6";
    }
`;

const BlockLink = styled(NavigationLink)`
    display: block;
    position: relative;
`;

const activeLinkCSS = css`
    color: ${primaryColor};
`;

const Links = ({ links, onOpen, opened }: LinksProps) => {
    return (
        <LinkList>
            {
                links.map((link) =>
                    (link as PageLink).to ?
                        <li key={link.id}>
                            <ClassNames>
                                {({ css }) => (
                                    <BlockLink
                                        to={(link as PageLink).to}
                                        activeClassName={css`${activeLinkCSS}`}
                                    >{link.name}</BlockLink>
                                )}
                            </ClassNames>
                        </li> :
                        <React.Fragment key={link.id}>
                            <li>
                                <ClassNames>
                                    {({ css }) => (
                                        // Intentionally use a GatsbyLink for these
                                        // intermediate link elements in order to
                                        // have them highlighted when a child is active
                                        // id of the PageLinkGroup must be part of the final path
                                        <BlockLink
                                            to={link.id}
                                            onClick={(e: React.MouseEvent) => onOpen(e, link.id)}
                                            css={opened[link.id] ? openedGroupCSS : closedGroupCSS}
                                            activeClassName={css`${activeLinkCSS}`}
                                            partiallyActive={true}
                                        >{link.name}</BlockLink>
                                    )}
                                </ClassNames>
                            </li>
                            { opened[link.id] && <li><Links
                                links={(link as PageLinkGroup).children}
                                onOpen={onOpen}
                                opened={opened}
                            /></li> }
                        </React.Fragment>
                )
            }
        </LinkList>
    );
};

const Nav = styled.nav`
    height: 100%;
    overflow-y: auto;
    padding: 0 24px 32px 0;
`;

const SiteNavigation = () => {
    // adjust the maximum level of links in the query accordingly
    const data = useStaticQuery(graphql`
        query LinksQuery {
            site {
                siteMetadata {
                    navigationLinks {
                        id
                        name
                        to
                        children {
                            id
                            name
                            to
                        }
                    }
                }
            }
        }
    `);
    const links: PageLinks = data.site.siteMetadata.navigationLinks;
    const [opened, setOpened] = useState({});
    const onOpen = useCallback((e, id) => {
        e.preventDefault();
        setOpened((prevOpened) => ({ ...prevOpened, [id]: !prevOpened[id] }));
    }, []);
    return (
        <Nav>
            <Links links={links} onOpen={onOpen} opened={opened} />
        </Nav>
    );
};

export default SiteNavigation;
