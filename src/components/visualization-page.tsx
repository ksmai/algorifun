import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

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

const VisualizationPage = ({
    WorkerFactory,
    DrawerFactory,
    config,
    width = 1920,
    height = 1080,
}: Props) => {
    const [data, setData] = useState(() => config.data());
    const canvasRef = useRef(null);

    useEffect(() => {
        let worker = new BufferedWorker(20, new WorkerFactory());
        const canvas = canvasRef.current;
        let visualizer = new Visualizer(canvas, worker, DrawerFactory);
        worker.init(data).then(() => {
            if (visualizer) {
                visualizer.start();
            }
        });

        return () => {
            visualizer.terminate();
            visualizer = null;
            worker = null;
        }
    }, [data]);

    return (
        <>
            <DrawingArea
                ref={canvasRef}
                width={width}
                height={height}
                data-paper-resize
            />
        </>
    );
};

export default VisualizationPage;
