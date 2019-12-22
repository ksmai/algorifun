import Algorithm from 'algorithms';
import Step from 'algorithms/step';

export default function runToEnd(algorithm: Algorithm) {
    let step: Step;
    do {
        step = algorithm.run();
    } while (!step.done);
    return algorithm.getResult();
}
