import React, { useCallback, useContext } from 'react';

import { play, pause, update } from 'components/visualization-page/actions';
import VisualizationContext from 'components/visualization-page/context';

const PlaybackControl = () => {
    const [{ paused }, dispatch] = useContext(VisualizationContext);
    const onPlay = useCallback(() => dispatch(play()), [dispatch]);
    const onPause = useCallback(() => dispatch(pause()), [dispatch]);
    const onRestart = useCallback(() => dispatch(update()), [dispatch]);

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
