import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import { primaryColor } from '../utils/colors';

const linkCSS = css`
    text-decoration: none;
    &:hover {
        color: ${primaryColor};
    }
`;

interface Props {
    to?: string;
    [key: string]: any;
}

const NavigationLink = ({ to, ... props }: Props) => {
    const Component = to ? Link : 'a';
    return <Component to={to} css={linkCSS} {...props} />
};

export default NavigationLink;
