import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Logo from 'components/logo';
import * as colors from 'utils/colors';

const height = 36;

const Container = styled.div`
    background-color: ${colors.bgColor2dp};
    position: relative;
    height: ${height}px;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenuButton = styled.button`
    background: none;
    padding: none;
    outline: none;
    border: 0;
    height: ${height}px;
    width: ${height}px;
    line-height: ${height}px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    color: ${colors.white};
`;

const logoCSS = css`
    width: 120px;
`;

interface Props {
    toggleSidebar: () => void;
}

const Topbar = ({ toggleSidebar, ...props }: Props) => {
    return (
        <Container {...props}>
            <MenuButton
                type="button"
                onClick={toggleSidebar}
            >≡</MenuButton>
            <Logo css={logoCSS} />
        </Container>
    );
};

export default Topbar;
