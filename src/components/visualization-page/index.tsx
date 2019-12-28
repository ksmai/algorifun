import React, { useReducer, useEffect, useRef, useMemo } from 'react';
import styled from '@emotion/styled';

import { Action, play } from 'components/visualization-page/actions'
import reducer from 'components/visualization-page/reducer';
import State from 'components/visualization-page/state';
import VisualizationContext from 'components/visualization-page/context';
import ControlPanel from 'components/visualization-page/control-panel';
import Config from 'configs';
import Worker from 'workers';
import Visualizer from 'visualizers';
import { DrawerConstructor } from 'visualizers/drawers';
import BufferedWorker from 'workers/buffered-worker';

const DrawingArea = styled.canvas`
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    height: 100vh;
    position: relative;
    overflow: hidden;
`;

interface Props {
    WorkerFactory: new () => Worker;
    DrawerFactory: DrawerConstructor;
    config: Config;
}

const init = (config: Config): State => {
    const data = config.data();
    const { validator } = config;
    const speed = 1;
    const paused = false;
    return { data, validator, speed, paused };
};

const VisualizationPage = ({
    WorkerFactory,
    DrawerFactory,
    config,
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
                dispatch(play());
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

    useEffect(() => {
        if (visualizerRef.current) {
            if (state.paused) {
                visualizerRef.current.pause();
            } else {
                visualizerRef.current.play();
            }
        }
    }, [state.paused]);

    const contextValue: [State, React.Dispatch<Action>] = useMemo(
        () => [state, dispatch],
        [state, dispatch],
    );

    return (
        <VisualizationContext.Provider value={contextValue}>
            <Container>
                <DrawingArea
                    ref={canvasRef}
                    data-paper-resize
                />
                <ControlPanel />
            </Container>
        </VisualizationContext.Provider>
    );
};

export default VisualizationPage;
