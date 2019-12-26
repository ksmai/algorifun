import React, { useState, useCallback } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled'

import * as colors from 'utils/colors';
import hexRGBA from 'utils/hex-rgba';
import clamp from 'utils/clamp';
import emptySelection from 'utils/empty-selection';
import DataEditor from 'components/visualization-page/data-editor';
import PlaybackControl from 'components/visualization-page/playback-control';
import SpeedModifier from 'components/visualization-page/speed-modifier';

interface ContainerProps {
    height: number;
    minHeight: number;
    maxVH: number;
    isResizing: boolean;
    isOpen: boolean;
}

const transform = ({ height, isResizing, isOpen, maxVH, minHeight }: ContainerProps) => {
    if (isResizing) {
        return css`
            transform: translateY(-${height}px);
        `;
    } else if (isOpen) {
        return css`
            transform: translateY(-${maxVH}vh);
        `;
    } else {
        return css`
            transform: translateY(-${minHeight}px);
        `;
    }
};

const height = ({ maxVH }: ContainerProps) => css`
    height: ${maxVH}vh;
`;

const transition = ({ isResizing }: ContainerProps) => css`
    transition: ${isResizing ? 'none' : 'transform .375s cubic-bezier(.4, 0, .2, 1)'};
`;

const Container = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: ${hexRGBA(colors.bgColor2dp, .7)};
    padding: 20px 50px;
    overflow: hidden;
    ${height};
    ${transform};
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

const CloseButton = styled.button`
    outline: none;
    box-shadow: none;
    padding: 0;
    border: none;
    background-color: ${colors.bgColor4dp};
    color: ${colors.white};
    border-radius: 50%;
    text-align: center;
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 24px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 8px;

    &:hover {
        background-color: ${colors.white};
        color: ${colors.bgColor4dp};
    }

    &:after {
        content: "🞩";
        display: block;
    }
`;

interface Props {
    maxVH?: number;
    minHeight?: number;
}

const ControlPanel = ({ maxVH = 90, minHeight = 20 }: Props) => {
    const [height, setHeight] = useState(0);
    const [lastClientYs, setLastClientYs] = useState([0, 0]);
    const [isResizing, setIsResizing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        (e.target as Element).setPointerCapture(e.pointerId);
        // if there are selections, onPointerCancel might fire for some reasons
        emptySelection();
        const { clientY } = e;
        const { innerHeight } = window;
        setIsResizing(true);
        setHeight(clamp(innerHeight - clientY, minHeight, innerHeight * maxVH / 100));
        setLastClientYs(([, lastClientY]) => [lastClientY, clientY]);
    }, [minHeight, maxVH]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!isResizing) {
            return;
        }
        const { clientY } = e;
        const { innerHeight } = window;
        setLastClientYs(([, lastClientY]) => [lastClientY, clientY]);
        setHeight(clamp(innerHeight - clientY, minHeight, innerHeight * maxVH / 100));
    }, [isResizing, minHeight, maxVH]);

    const onPointerUpCancel = useCallback((e: React.PointerEvent) => {
        setIsResizing(false);
        const delta = lastClientYs[1] - lastClientYs[0];
        if (delta < -20) {
            setIsOpen(true);
        } else if (delta > 20) {
            setIsOpen(false);
        } else {
            setIsOpen(height > window.innerHeight * maxVH / 200);
        }
    }, [height, lastClientYs, maxVH]);

    const onClose = useCallback((e: React.MouseEvent) => {
        setIsOpen(false);
    }, []);

    return (
        <Container
            height={height}
            isResizing={isResizing}
            isOpen={isOpen}
            minHeight={minHeight}
            maxVH={maxVH}
        >
            <CloseButton onClick={onClose} />
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
