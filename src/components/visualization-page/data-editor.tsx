import React, { useCallback } from 'react';

import { InputAction, UpdateAction } from './actions';

interface Props {
    input: string;
    dispatch: (action: InputAction | UpdateAction ) => void;
}

const DataEditor = ({ input, dispatch }: Props) => {
    const onChange = useCallback((e) => {
        dispatch({
            type: 'input',
            payload: {
                input: e.target.value,
            },
        });
    }, [dispatch]);

    const onConfirm = useCallback((e) => {
        dispatch({
            type: 'update',
        })
    }, [dispatch]);

    return (
        <>
            <textarea
                onChange={onChange}
                value={input}
            />
            <button
                type="button"
                onClick={onConfirm}
            >Confirm</button>
        </>
    );
};

export default DataEditor;
