/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Sidebar from './sidebar';

const sidebarWidth = 300;
const sidebarCSS = css`
  position: fixed;
  top 0;
  left: 0;
  bottom: 0;
  width: ${sidebarWidth}px;
`;

const Content = styled.main`
  margin-left: ${sidebarWidth}px;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar css={sidebarCSS} />
      <Content>{children}</Content>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
