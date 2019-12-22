import Step from 'algorithms/step';

export default interface Worker {
    init(data: any): Promise<void>;
    run(): Promise<Step>;
    terminate(): void;
}
