import React, { useCallback } from 'react';

import { SpeedupAction } from 'components/visualization-page/actions';

interface SpeedChoice {
    speed: number;
    name: string;
}

interface Props {
    dispatch: (action: SpeedupAction) => void;
    speed: number;
    speeds: SpeedChoice[];
}

const SpeedModifer = ({ speed, dispatch, speeds }: Props) => {
    const callback = useCallback((e) => {
        dispatch({
            type: 'speedup',
            payload: {
                speed: parseFloat(e.target.value),
            },
        });
    }, [dispatch])
    return (
        <select onChange={callback}>
            {speeds.map((choice) => (
                <option
                    value={choice.speed}
                    key={choice.name}
                    selected={speed === choice.speed}
                >{choice.name}</option>
            ))}
        </select>
    );
};

export default SpeedModifer;
