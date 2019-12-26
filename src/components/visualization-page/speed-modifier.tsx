import React, { useCallback, useContext } from 'react';

import { speedup } from 'components/visualization-page/actions';
import VisualizationContext from 'components/visualization-page/context';

interface SpeedChoice {
    speed: number;
    name: string;
}

const choices: SpeedChoice[] = [
    { speed: 0.25, name: '0.25x' },
    { speed: 0.5, name: '0.5x' },
    { speed: 1, name: '1x' },
    { speed: 2, name: '2x' },
    { speed: 4, name: '4x' },
];

const SpeedModifer = () => {
    const [{ speed }, dispatch] = useContext(VisualizationContext);

    const onChange = useCallback(
        (e) => dispatch(speedup(parseFloat(e.target.value))),
        [dispatch],
    );

    return (
        <select onChange={onChange} value={speed}>
            {choices.map(({ speed, name }) => (
                <option
                    value={speed}
                    key={name}
                >{name}</option>
            ))}
        </select>
    );
};

export default SpeedModifer;
