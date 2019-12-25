import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import Step from 'algorithms/step';
import Worker from 'workers';
import Visualizer from 'visualizers';
import BufferedWorker from 'workers/buffered-worker';

const DrawingArea = styled.canvas`
    width: 100%;
`;

interface Props {
    WorkerConstructor: new () => Worker;
    VisualizerConstructor: new (canvas: HTMLCanvasElement, worker: Worker) => Visualizer;
    inputs: any;
    width?: number;
    height?: number;
}

const VisualizationPage = ({
    WorkerConstructor,
    VisualizerConstructor,
    inputs,
    width = 1920,
    height = 1080,
}: Props) => {
    const [data, setData] = useState(inputs);
    const canvasRef = useRef(null);

    useEffect(() => {
        let worker = new BufferedWorker(20, new WorkerConstructor());
        const canvas = canvasRef.current;
        let visualizer = new VisualizerConstructor(canvas, worker);
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
