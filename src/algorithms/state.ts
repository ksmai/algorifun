import Step from "algorithms/step";

interface Result {
    step: Step;
    next: State;
}

export default interface State {
    run(): Result;
}
