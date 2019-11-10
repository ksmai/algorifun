import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const Headline = styled.h1`
  font-size: 24px;
  color: red;
  text-decoration: underline;
`;

const greet: string = 'Test Again';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Headline>{greet}</Headline>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
