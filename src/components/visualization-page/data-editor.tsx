import React, { useCallback, useContext, useState } from 'react';
import styled from '@emotion/styled';

import { update } from 'components/visualization-page/actions';
import VisualizationContext from 'components/visualization-page/context';
import * as colors from 'utils/colors';
import hexRGBA from 'utils/hex-rgba';
import Button from 'components/button';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0;
    position: relative;
`;

const TextAreaContainer = styled.div`
    width: 100%;
    flex: 1 1 auto;
    margin-bottom: 8px;
`;

const TextArea = styled.textarea`
    resize: none;
    width: 100%;
    height: 100%;
    padding: 16px;
    outline: none;
    background: ${hexRGBA(colors.bgColor6dp, .7)};
    color: ${colors.white};
    border: 1px solid ${colors.white};
`;

const ConfirmButton = styled(Button)`
    width: 100%;
`;

const ErrorContainer = styled.div`
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${hexRGBA(colors.bgColor8dp, .7)};
`;

const ErrorMessage = styled.p`
    color: ${colors.textColorError};
    margin-bottom: 16px;
`;

const DataEditor = ({ ...props }) => {
    const [{ data, validator }, dispatch] = useContext(VisualizationContext);
    const [currentValue, setCurrentValue] = useState(() => JSON.stringify(data, null, 4));
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            let data: any;
            try {
                data = JSON.parse(currentValue);
            } catch (e) {
                setErrorMessage(e.message);
                return;
            }
            const error = validator(data);
            if (error) {
                setErrorMessage(error);
            } else {
                dispatch(update(data));
                setCurrentValue(JSON.stringify(data, null, 4));
            }
        },
        [currentValue, dispatch, validator],
    );

    const onChange = useCallback(
        (e) => setCurrentValue(e.target.value),
        [],
    );

    const onDismissError = useCallback(
        () => setErrorMessage(''),
        [],
    );

    return (
        <Form
            onSubmit={onSubmit}
            {...props}
        >
            <TextAreaContainer>
                <TextArea
                    onChange={onChange}
                    value={currentValue}
                    name="data"
                />
            </TextAreaContainer>
            <ConfirmButton
                type="submit"
            >Confirm</ConfirmButton>

            {errorMessage && <ErrorContainer>
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <Button type="button" onClick={onDismissError}>Noted</Button>
            </ErrorContainer>}
        </Form>
    );
};

export default DataEditor;
