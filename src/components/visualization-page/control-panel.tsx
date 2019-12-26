import React, { useState, useCallback } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled'

import * as colors from 'utils/colors';
import hexRGBA from 'utils/hex-rgba';
import clamp from 'utils/clamp';
import DataEditor from 'components/visualization-page/data-editor';
import PlaybackControl from 'components/visualization-page/playback-control';
import SpeedModifier from 'components/visualization-page/speed-modifier';

interface ContainerProps {
    height: number;
    isResizing: boolean;
    isOpen: boolean;
}

const height = ({ height, isResizing, isOpen }: ContainerProps) => {
    if (isResizing) {
        return css`height: ${height}px;`;
    } else if (isOpen) {
        return css`height: 90%`;
    } else {
        return css`
            height: 20px;
            padding-bottom: 0;
        `;
    }
};

const transition = ({ isResizing }: ContainerProps) => css`
    transition: ${isResizing ? 'none' : 'height .5s ease-in-out'};
`;

const Container = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: ${hexRGBA(colors.bgColor2dp, .5)};
    padding: 20px 50px;
    overflow: hidden;
    ${height};
    ${transition};
`;

const ResizeHandle = styled.div`
    position: absolute;
    cursor: row-resize;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    width: 35px;
    height: 10px;

    &:before,
    &:after {
        content: "";
        display: block;
        position: absolute;
        border: .5px solid ${colors.white};
        left: 50%;
        transform: translateX(-50%);
    }
    &:before {
        width: 15px;
        top: 5px;
    }
    &:after {
        width: 35px;
        top: 8px;
    }
`;

const resizing = css`
`;

const ControlPanel = () => {
    const [height, setHeight] = useState(0);
    const [pointerY, setPointerY] = useState(0);
    const [isResizing, setIsResizing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        (e.target as Element).setPointerCapture(e.pointerId);
        setIsResizing(true);
        setHeight(clamp(window.innerHeight - e.clientY, 0, window.innerHeight));
        setPointerY(e.clientY);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!isResizing) {
            return;
        }
        setHeight(clamp(window.innerHeight - e.clientY, 0, window.innerHeight));
    }, [isResizing]);

    const onPointerUpCancel = useCallback((e: React.PointerEvent) => {
        setIsResizing(false);
        const delta = e.clientY - pointerY;
        if (delta < -100) {
            setIsOpen(true);
        } else if (delta > 100) {
            setIsOpen(false);
        } else {
            setIsOpen(height > window.innerHeight * 0.4);
        }
    }, [height, pointerY]);

    return (
        <Container
            height={height}
            isResizing={isResizing}
            isOpen={isOpen}
        >
            <ResizeHandle
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUpCancel}
                onPointerCancel={onPointerUpCancel}
            />
            <DataEditor />
            <PlaybackControl />
            <SpeedModifier />
        </Container>
    )
};

export default ControlPanel;
