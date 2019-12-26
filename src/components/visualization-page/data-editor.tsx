import React, { useCallback, useContext } from 'react';

import { input, update } from 'components/visualization-page/actions';
import VisualizationContext from 'components/visualization-page/context';

const DataEditor = () => {
    const [{ value }, dispatch] = useContext(VisualizationContext);

    const onChange = useCallback(
        (e) => dispatch(input(e.target.value)),
        [dispatch],
    );

    const onConfirm = useCallback((e) => dispatch(update()), [dispatch]);

    return (
        <>
            <textarea
                onChange={onChange}
                value={value}
            />
            <button
                type="button"
                onClick={onConfirm}
            >Confirm</button>
        </>
    );
};

export default DataEditor;
