import Step from 'algorithms/step';

export default interface Algorithm {
    run(...args: any[]): Step;
    getResult(): any;
}
