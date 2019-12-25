import Animation from 'visualizers/animations';

export default class IdleAnimation implements Animation {
    constructor(private seconds: number) {
    }

    run(dt) {
        this.seconds -= dt;
    }

    isFinished() {
        return this.seconds <= 0;
    }
}
