import React, { useCallback, useContext, useMemo, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled'

import { speedup } from 'components/visualization-page/actions';
import VisualizationContext from 'components/visualization-page/context';
import * as colors from 'utils/colors';
import Button from 'components/button';

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

const padding = css`
    padding: 0 8px;
`;

const ComboBox = styled(Button)`
    display: inline-block;
    width: 64px;
    position: relative;
    outline: none;
    text-align: right;
    ${padding}
`.withComponent('div');

interface OptionsProps {
    offset: number;
}

const Options = styled.div`
    position: absolute;
    z-index: 100;
    top: 0;
    left: -1px;
    right: -1px;
    background-color: ${colors.bgColor6dp};
    transform: translateY(${({ offset }: OptionsProps) => -offset * 100 / choices.length}%);
`;

const Option = styled(Button)`
    width: 100%;
    border: 0;
    border-radius: 0;
    text-align: right;
    ${padding}
`.withComponent('div');

const SpeedModifer = () => {
    const [{ speed }, dispatch] = useContext(VisualizationContext);
    const [open, setOpen] = useState(false);

    const [offset, name] = useMemo(() => {
        const index = choices.findIndex(({ speed: s }) => speed === s);
        if (index === -1) {
            return [0, ''];
        }
        return [index, choices[index].name];
    }, [speed]);

    const onClick = useCallback((e: React.MouseEvent) => {
        setOpen((prevOpen) => !prevOpen);
        const speed = (e.target as HTMLElement).dataset.speed;
        if (typeof speed !== 'undefined') {
            dispatch(speedup(parseFloat(speed)));
        }
    }, []);

    const onBlur = useCallback((e: React.FocusEvent) => {
        setOpen(false);
    }, []);

    return (
        <ComboBox
            tabIndex={0}
            onClick={onClick}
            onBlur={onBlur}
        >
            {name}
            {open && <Options offset={offset}>
                {choices.map(({ name, speed }) => (
                    <Option
                        key={name}
                        data-speed={speed}
                    >{name}</Option>
                ))}
            </Options>}
        </ComboBox>
    );
};

export default SpeedModifer;
