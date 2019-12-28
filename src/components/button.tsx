import styled from '@emotion/styled';
import { css } from '@emotion/core';

import * as colors from 'utils/colors';

export const activeCSS = css`
    background-color: ${colors.white};
    color: ${colors.bgColor6dp};
`;

export default styled.button`
    background: none;
    box-shadow: none;
    outline: none;
    padding: 0 16px;
    border: 1px solid ${colors.white};
    color: ${colors.white};
    cursor: pointer;
    border-radius: 3px;
    height: 32px;
    line-height: 32px;
    text-align: center;

    &:hover {
        ${activeCSS}
    }
`;
