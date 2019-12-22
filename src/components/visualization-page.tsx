import React, { useState, useEffect } from 'react';

import Algorithm from 'algorithms';
import Tracer from 'tracers/tracer';

interface Props {
    algorithm: Algorithm;
    inputs: any;
}

const VisualizationPage = ({ algorithm, inputs }: Props) => {
    const [data, setData] = useState(inputs);
    const [traces, setTraces] = useState([]);

    useEffect(() => {
        const tracer = new Tracer();
        tracer.clear();
        algorithm.run(data, tracer);
        setTraces(tracer.getTraces());
    }, [data]);

    return (
        <>
            <p>{JSON.stringify(traces, null, 2)}</p>
        </>
    );
};

export default VisualizationPage;
