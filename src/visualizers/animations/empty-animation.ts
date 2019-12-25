import Animation from "visualizers/animations";

export default class EmptyAnimation implements Animation {
    run(dt) {
    }

    isFinished() {
        return true;
    }
}
