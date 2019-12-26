import React, { useCallback } from 'react';
import { PlayAction, PauseAction, UpdateAction } from 'components/visualization-page/actions';

interface Props {
    paused: boolean;
    dispatch: (action: PlayAction | PauseAction | UpdateAction ) => void;
}

const PlaybackControl = ({ paused, dispatch }: Props) => {
    const onPlay = useCallback(() => dispatch({ type: 'play' }), [dispatch]);
    const onPause = useCallback(() => dispatch({ type: 'pause' }), [dispatch]);
    const onRestart = useCallback(() => dispatch({ type: 'update' }), [dispatch]);

    return (
        <>
            {paused ?
                <button type="button" onClick={onPlay}>Play</button> :
                <button type="button" onClick={onPause}>Pause</button>}
            }
            <button type="button" onClick={onRestart}>Restart</button>
        </>
    );
};

export default PlaybackControl;
