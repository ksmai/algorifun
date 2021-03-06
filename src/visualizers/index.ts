import paper from 'paper';

import Worker from 'workers';
import Drawer, { DrawerConstructor } from 'visualizers/drawers'
import Animation from 'visualizers/animations';

export default class Visualizer {
    private animation: Animation = null;
    private finishAnimation: () => void = null;
    private done: boolean = false;
    private project: paper.Project;
    private drawer: Drawer;
    private speed = 1;
    private paused = false;

    constructor(
        private canvas: HTMLCanvasElement,
        private worker: Worker,
        DrawerFactory: DrawerConstructor,
    ) {
        this.project = new paper.Project(canvas);
        this.project.activate();
        this.project.view.onFrame = this.onFrame.bind(this);
        this.drawer = new DrawerFactory(this.project.view);
    }

    private onFrame(event: any) {
        if (this.animation) {
            const speed = this.paused ? 0 : this.speed;
            this.animation.run(event.delta * speed)
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
            await this.animate(this.drawer.handleStep(step));
            step = await this.worker.run();
        }
    }

    changeSpeed(speed: number): void {
        if (speed >= 0) {
            this.speed = speed;
        }
    }

    pause(): void {
        this.paused = true;
    }

    play(): void {
        this.paused = false;
    }

    private animate(animation: Animation): Promise<void> {
        this.animation = animation;
        if (!this.animation) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            this.finishAnimation = resolve;
        });
    }

    terminate(): void {
        this.drawer.terminate();
        this.project.view.onFrame = null;
        this.project.clear();
        this.project.remove();
        this.worker.terminate();
        this.done = true;
        this.worker = null;
        this.project = null;
    }
}
