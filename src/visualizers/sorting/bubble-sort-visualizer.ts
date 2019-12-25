import paper from 'paper';

import Step from 'algorithms/step';
import Visualizer from 'visualizers';
import Worker from 'workers';
import Animation from 'visualizers/animation';
import NumberedCircle from 'visualizers/common/numbered-circle';
import IdleAnimation from 'visualizers/common/idle-animation';

export default class BubbleSortVisualizer implements Visualizer {
    private animation: Animation = null;
    private finishAnimation: () => void = null;
    private done: boolean = false;
    private project: paper.Project;
    private circles: NumberedCircle[];

    constructor(
        private canvas: HTMLCanvasElement,
        private worker: Worker,
    ) {
        this.project = new paper.Project(canvas);
        this.project.activate();
        this.project.view.onFrame = (event) => this.onFrame(event);
    }

    private onFrame(event: any) {
        if (this.animation) {
            this.animation.run(event.delta)
            if (this.animation.isFinished()) {
                this.finishAnimation();
                this.finishAnimation = null;
                this.animation = null;
            }
        }
    }

    async start(): Promise<void> {
        let step = await this.worker.run();
        while (true) {
            if (step.done || this.done) {
                this.done = true;
                break;
            }
            switch (step.type) {
                case 'init':
                    this.handleInit(step);
                    break;
                case 'comp':
                    this.handleComp(step);
                    break;
                case 'swap':
                    this.handleSwap(step);
                    break;
                case 'noswap':
                    this.handleNoSwap(step);
                    break;
            }
            await this.animate();
            step = await this.worker.run();
        }
    }

    private animate(): Promise<void> {
        if (!this.animation) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            this.finishAnimation = resolve;
        });
    }

    private handleInit(step: Step) {
        const arr = step.payload.data;
        const { width, height } = this.project.view.viewSize;
        const radius = width / 30;
        const color = new paper.Color(1, 1, 1);
        const position = new paper.Point(radius * 2, height / 2);
        this.circles = arr.map((number: number, i: number) => {
            const circle = new NumberedCircle({
                number,
                radius,
                color,
                position: position.add(new paper.Point(radius * 3 * i, 0)),
            });
            return circle;
        });
        this.animation = new IdleAnimation(1);
    }

    private handleComp(step: Step) {
        const { pos } = step.payload;
        const activeColor = new paper.Color('green');
        this.circles[pos].changeColor(activeColor);
        this.circles[pos + 1].changeColor(activeColor);
        this.animation = new IdleAnimation(1);
    }

    private handleSwap(step: Step) {
        const { pos } = step.payload;
        const left = this.circles[pos];
        const right = this.circles[pos + 1];
        [left.position, right.position] = [right.position, left.position];
        this.circles[pos] = right;
        this.circles[pos + 1] = left;
        const white = new paper.Color(1, 1, 1);
        this.circles[pos].changeColor(white);
        this.circles[pos + 1].changeColor(white);
        this.animation = new IdleAnimation(1);
    }

    private handleNoSwap(step: Step) {
        const { pos } = step.payload;
        const white = new paper.Color(1, 1, 1);
        this.circles[pos].changeColor(white);
        this.circles[pos + 1].changeColor(white);
        this.animation = new IdleAnimation(1);
    }

    terminate(): void {
        for (let circle of this.circles) {
            circle.remove();
        }
        this.project.view.onFrame = null;
        this.project.clear();
        this.project.remove();
        this.worker.terminate();
        this.done = true;
        this.worker = null;
        this.project = null;
    }
}
