import React from 'react';
import { Link } from 'gatsby';
  import { css } from '@emotion/core';
import styled from '@emotion/styled';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const Headline = styled.h1`
  color: red;
  text-decoration: underline;
`;

const greet: string = 'Test Again';

const myColor = '#ff00ff';
const anotherColor = '#00ff00'
const goodCSS = css`
  color: ${myColor};
`;
const anotherGoodCSS = css`
  ${goodCSS};
  background-color: ${anotherColor};
  &::before {
    display: block;
    content: "ABC";
    background-color: black;
  }
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Headline>{greet}</Headline>
    <p css={goodCSS}>Welcome to your new Gatsby site.</p>
    <p css={anotherGoodCSS}>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
