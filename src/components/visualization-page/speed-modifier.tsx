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
        <select onChange={callback} value={speed}>
            {speeds.map(({ speed, name }) => (
                <option
                    value={speed}
                    key={name}
                >{name}</option>
            ))}
        </select>
    );
};

export default SpeedModifer;
