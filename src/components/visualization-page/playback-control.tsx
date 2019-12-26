import React, { useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { play, pause, update } from 'components/visualization-page/actions';
import VisualizationContext from 'components/visualization-page/context';
import * as colors from 'utils/colors';

const activeCSS = css`
    background-color: ${colors.white};
    color: ${colors.bgColor6dp};
`;

const IconButton = styled.button`
    background: none;
    box-shadow: none;
    outline: none;
    padding: none;
    border: 1px solid ${colors.white};
    color: ${colors.white};
    cursor: pointer;
    border-radius: 3px;
    height: 32px;
    line-height: 32px;
    width: 32px;
    text-align: center;

    &:hover {
        ${activeCSS}
    }
`;

const PlaybackControl = () => {
    const [{ paused }, dispatch] = useContext(VisualizationContext);
    const onPlay = useCallback(() => dispatch(play()), [dispatch]);
    const onPause = useCallback(() => dispatch(pause()), [dispatch]);
    const onRestart = useCallback(() => dispatch(update()), [dispatch]);

    return (
        <>
            <IconButton type="button" onClick={onPlay} css={!paused && activeCSS}>▶️</IconButton>
            <IconButton type="button" onClick={onPause} css={paused && activeCSS}>⏸️</IconButton>
            <IconButton type="button" onClick={onRestart}>↺</IconButton>
        </>
    );
};

export default PlaybackControl;
