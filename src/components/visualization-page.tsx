import React, { useState, useEffect } from 'react';

import Algorithm from 'algorithms';

interface Props {
    AlgorithmConstructor: new (...args: any[]) => Algorithm;
    inputs: any;
    params: any[];
}

const VisualizationPage = ({ AlgorithmConstructor, inputs, params }: Props) => {
    const [data, setData] = useState(inputs);

    useEffect(() => {
        const algorithm = new AlgorithmConstructor(data, ...params);
        const runToEnd = require('algorithms/run-to-end').default;
        console.log(runToEnd(algorithm));
    }, [data, params]);

    return (
        <>
            <p>Hello World</p>
        </>
    );
};

export default VisualizationPage;
