/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Sidebar from 'components/sidebar';
import Topbar from 'components/topbar';
import { bgColor, bgColor1dp } from 'utils/colors';
import { mobile, notMobile } from 'utils/breakpoints';

const sidebarWidth = 300;
const sidebarCSS = ({ opened }) => css`
  position: fixed;
  top 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: ${sidebarWidth}px;
  background-color: ${bgColor1dp};

  ${mobile`
    transform: translateX(${ opened ? 0 : -sidebarWidth }px);
    transition: transform .3s cubic-bezier(.4, 0, .2, 1);
    max-width: 90%;
  `}
`;

const StyledSidebar = styled(Sidebar)`
  ${sidebarCSS}
`;

const StyledTopbar = styled(Topbar)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  ${notMobile`
    display: none;
  `}
`;

const Content = styled.main`
  min-height: 100vh;
  background-color: ${bgColor};

  ${notMobile`
    margin-left: ${sidebarWidth}px;
  `}
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  z-index: 200;
`;

const Layout = ({ children }) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = useCallback(() => {
    setOpened((prevOpened) => !prevOpened);
  }, [])

  return (
    <>
      <StyledTopbar toggleSidebar={toggleOpened} />
      <StyledSidebar opened={opened} />
      <Content>{children}</Content>
      {opened && <Backdrop onClick={toggleOpened} />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
