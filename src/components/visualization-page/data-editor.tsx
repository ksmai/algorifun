import React, { useCallback, useContext } from 'react';

import { input } from 'components/visualization-page/actions';
import VisualizationContext from 'components/visualization-page/context';

const DataEditor = () => {
    const [{ value }, dispatch] = useContext(VisualizationContext);

    const onChange = useCallback(
        (e) => dispatch(input(e.target.value)),
        [dispatch],
    );

    return (
        <>
            <textarea
                onChange={onChange}
                value={value}
            />
        </>
    );
};

export default DataEditor;
