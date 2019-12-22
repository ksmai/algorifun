import React, { useState, useEffect } from 'react';

import Step from 'algorithms/step';
import Worker from 'workers';

interface Props {
    WorkerConstructor: new () => Worker;
    inputs: any;
}

const VisualizationPage = ({ WorkerConstructor, inputs }: Props) => {
    const [data, setData] = useState(inputs);

    useEffect(() => {
        let worker = new WorkerConstructor();
        let stop = false;
        (window as any).stopMe = () => stop = true;

        function handleStep(step: Step): Promise<Step|null> {
            if (step.done) {
                stop = true;
            }
            if (stop) {
                return Promise.resolve(null);
            }
            console.log(step);
            return worker.run().then(handleStep);
        }
        worker.init(data)
            .then(() => worker.run())
            .then(handleStep);

        return () => {
            stop = true;
            worker.terminate();
            worker = null;
        };
    }, [data]);

    return (
        <>
            <canvas width="1920" height="1080"></canvas>
        </>
    );
};

export default VisualizationPage;
