import paper from 'paper';

import clamp from 'utils/clamp';
import Animation from 'visualizers/animations';

export default class SlideAnimation implements Animation {
    private t = 0;
    private diff: paper.Point;

    constructor(
        private seconds: number,
        private item: paper.Item | paper.View,
        private prevTranslate: paper.Point,
        private nextTranslate: paper.Point,
    ) {
        this.diff = nextTranslate.subtract(this.prevTranslate);
    }

    run(dt: number) {
        this.t = this.t + dt;
        const progress = clamp(this.t / this.seconds, 0, 1);
        const { x, y } = this.prevTranslate.add(this.diff.multiply(progress));
        this.item.matrix = new paper.Matrix(1, 0, 0, 1, x, y);
    }

    isFinished() {
        return this.t >= this.seconds;
    }
}
