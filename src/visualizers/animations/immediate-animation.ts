import Animation from 'visualizers/animations';

interface VoidFunction {
    (): void;
}

export default class ImmediateAnimation implements Animation {
    private hasRun = false;

    constructor(private fn: VoidFunction) {
    }

    run(dt) {
        if (!this.isFinished()) {
            this.hasRun = true;
            this.fn();
        }
    }

    isFinished() {
        return !this.fn || this.hasRun;
    }
};
