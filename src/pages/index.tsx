import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { bgColor } from '../utils/colors';

const Container = styled.div`
  background-color: ${bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Container>
      <h1>This is the home page (Work in progress)</h1>
    </Container>
  </Layout>
);

export default IndexPage;
