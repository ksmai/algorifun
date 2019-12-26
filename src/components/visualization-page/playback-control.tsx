import React, { useCallback, useContext } from 'react';
import styled from '@emotion/styled';

import { play, pause, update } from 'components/visualization-page/actions';
import VisualizationContext from 'components/visualization-page/context';
import Button, { activeCSS } from 'components/button';

const IconButton = styled(Button)`
    padding: 0;
    width: 32px;
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
