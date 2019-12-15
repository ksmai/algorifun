import React, { useState, useCallback } from 'react';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';

import NavigationLink from './navigation-link';
import { primaryColor } from '../utils/colors';

interface PageLink {
    name: string;
    to: string;
};

interface PageLinkGroup {
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
                        <li key={link.name}>
                            <ClassNames>
                                {({ css }) => (
                                    <BlockLink
                                        to={(link as PageLink).to}
                                        activeClassName={css`${activeLinkCSS}`}
                                    >{link.name}</BlockLink>
                                )}
                            </ClassNames>
                        </li> :
                        <>
                            <li key={link.name}>
                                <BlockLink
                                    href="#"
                                    onClick={(e) => onOpen(e, link.name)}
                                    css={opened[link.name] ? [activeLinkCSS, openedGroupCSS] : closedGroupCSS}
                                >{link.name}</BlockLink>
                            </li>
                            { opened[link.name] && <li key={`__nested__${link.name}`}><Links
                                links={(link as PageLinkGroup).children}
                                onOpen={onOpen}
                                opened={opened}
                            /></li> }
                        </>
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
    // hardcode 3 levels max
    const data = useStaticQuery(graphql`
        query LinksQuery {
            site {
                siteMetadata {
                    navigationLinks {
                        name
                        to
                        children {
                            name
                            to
                            children {
                                name
                                to
                            }
                        }
                    }
                }
            }
        }
    `);
    const links: PageLinks = data.site.siteMetadata.navigationLinks;
    const [opened, setOpened] = useState({});
    const onOpen = useCallback((e, name) => {
        e.preventDefault();
        setOpened((prevOpened) => ({ ...prevOpened, [name]: !prevOpened[name] }));
    }, []);
    return (
        <Nav>
            <Links links={links} onOpen={onOpen} opened={opened} />
        </Nav>
    );
};

export default SiteNavigation;
