import paper from 'paper';

import Animation from 'visualizers/animations';
import clamp from 'utils/clamp'

export default class SwapAnimation implements Animation {
    private t: number = 0;
    private path1: paper.Path;
    private path2: paper.Path;

    constructor(private seconds: number, private item1: paper.Item, private item2: paper.Item) {
        const through1: paper.Point = new paper.Point(
            (item1.position.x + item2.position.x) / 2,
            item1.position.y - 2 * item1.bounds.height / 3,
        );
        this.path1 = new paper.Path.Arc(
            item1.position,
            through1,
            item2.position,
        );
        const through2: paper.Point = new paper.Point(
            (item1.position.x + item2.position.x) / 2,
            item2.position.y + 2 * item2.bounds.height / 3,
        );
        this.path2 = new paper.Path.Arc(
            item2.position,
            through2,
            item1.position,
        );
    }

    run(dt: number) {
        this.t = this.t + dt;
        const progress = clamp(this.t / this.seconds, 0, 1);
        this.item1.position = this.path1.getPointAt(this.path1.length * progress);
        this.item2.position = this.path2.getPointAt(this.path2.length * progress);
    }

    isFinished() {
        return this.t >= 1;
    }
}
