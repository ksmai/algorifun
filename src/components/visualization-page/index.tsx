import React, { useReducer, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import Action from 'components/visualization-page/actions'
import SpeedModifier from 'components/visualization-page/speed-modifier';
import DataEditor from 'components/visualization-page/data-editor';
import Config from 'configs';
import Worker from 'workers';
import Visualizer from 'visualizers';
import { DrawerConstructor } from 'visualizers/drawers';
import BufferedWorker from 'workers/buffered-worker';

const DrawingArea = styled.canvas`
    width: 100%;
`;

interface Props {
    WorkerFactory: new () => Worker;
    DrawerFactory: DrawerConstructor;
    config: Config;
    width?: number;
    height?: number;
}

interface State {
    data: any;
    input: string;
    speed: number;
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'input':
            const { input } = action.payload;
            return { ...state, input };
        case 'update':
            const data = JSON.parse(state.input);
            return {
                ...state,
                data,
                input: JSON.stringify(data, null, 4),
            };
        case 'speedup':
            return {
                ...state,
                speed: action.payload.speed,
            }
        default:
            return state;
    }
};

const init = (config: Config) => {
    const data = config.data();
    const input = JSON.stringify(data, null, 4);
    const speed = 1;
    return { data, input, speed };
};

const speeds = [
    { speed: 0.25, name: '0.25x' },
    { speed: 0.5, name: '0.5x' },
    { speed: 1, name: '1x' },
    { speed: 2, name: '2x' },
    { speed: 4, name: '4x' },
];

const VisualizationPage = ({
    WorkerFactory,
    DrawerFactory,
    config,
    width = 1920,
    height = 1080,
}: Props) => {
    const [state, dispatch] = useReducer(reducer, config, init);
    const canvasRef = useRef(null);
    const visualizerRef = useRef(null);

    useEffect(() => {
        let worker = new BufferedWorker(20, new WorkerFactory());
        const canvas = canvasRef.current;
        visualizerRef.current = new Visualizer(canvas, worker, DrawerFactory);
        worker.init(state.data).then(() => {
            if (visualizerRef.current) {
                visualizerRef.current.changeSpeed(state.speed);
                visualizerRef.current.start();
            }
        });

        return () => {
            visualizerRef.current.terminate();
            visualizerRef.current = null;
            worker = null;
        }
    }, [state.data]);

    useEffect(() => {
        if (visualizerRef.current) {
            visualizerRef.current.changeSpeed(state.speed);
        }
    }, [state.speed]);

    return (
        <>
            <DrawingArea
                ref={canvasRef}
                width={width}
                height={height}
                data-paper-resize
            />
            <SpeedModifier
                speed={state.speed}
                speeds={speeds}
                dispatch={dispatch}
            />
            <DataEditor
                input={state.input}
                dispatch={dispatch}
            />
        </>
    );
};

export default VisualizationPage;
