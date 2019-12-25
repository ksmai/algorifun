import paper from 'paper';

import Step from 'algorithms/step';
import Drawer from 'visualizers/drawers';
import NumberedCircle from 'visualizers/common/numbered-circle';
import Camera from 'visualizers/common/camera';
import Animation from 'visualizers/animations';
import IdleAnimation from 'visualizers/animations/idle-animation';
import EmptyAnimation from 'visualizers/animations/empty-animation';
import SwapAnimation from 'visualizers/animations/swap-animation';
import ImmediateAnimation from 'visualizers/animations/immediate-animation';
import CompositeAnimation from 'visualizers/animations/composite-animation';
import * as colors from 'utils/colors';

export default class BubbleSortDrawer implements Drawer {
    static readonly INITIAL_COLOR = new paper.Color(colors.white);
    static readonly HIGHLIGHTED_COLOR = new paper.Color(colors.orange);
    static readonly FINISHED_COLOR = new paper.Color(colors.lightGreen);
    static readonly INIT_IDLE = 0.5;
    static readonly COMP_IDLE = 1;
    static readonly SWAP_DURATION = 0.6;
    static readonly SWAP_IDLE = 0.5;
    static readonly NOSWAP_IDLE = 0.5;
    static readonly SLIDE_DURATION = 0.8;
    static readonly RADIUS = 1 / 30; // in terms of width
    static readonly MARGIN = 1 / 30; // in terms of width
    static readonly PADDING = 1 / 30; // in terms of width

    private circles: NumberedCircle[];
    private camera: Camera;

    constructor(private view: paper.View) {
    }

    handleStep(step: Step): Animation {
        switch (step.type) {
            case 'init':
                return this.handleInit(step);
            case 'comp':
                return this.handleComp(step);
            case 'swap':
                return this.handleSwap(step);
            case 'noswap':
                return this.handleNoSwap(step);
        }
        return new EmptyAnimation();
    }

    private handleInit(step: Step): Animation {
        const { width, height } = this.view.viewSize;
        const arr = step.payload.data;
        const radius = width * BubbleSortDrawer.RADIUS;
        const padding = width * BubbleSortDrawer.PADDING;
        const margin = width * BubbleSortDrawer.MARGIN;
        const position = new paper.Point(radius + padding, height / 2);
        this.circles = arr.map((number: number, i: number) => {
            const circle = new NumberedCircle({
                number,
                radius,
                color: BubbleSortDrawer.INITIAL_COLOR,
                position: position.add(new paper.Point((radius * 2 + margin) * i, 0)),
            });
            return circle;
        });
        const xmax = this.circles[this.circles.length - 1].bounds.right + padding;
        const ymax = height;
        this.camera = new Camera(this.view, xmax, ymax);
        return new IdleAnimation(BubbleSortDrawer.INIT_IDLE);
    }

    private handleComp(step: Step): Animation {
        const { pos } = step.payload;
        this.circles[pos].changeColor(BubbleSortDrawer.HIGHLIGHTED_COLOR);
        this.circles[pos + 1].changeColor(BubbleSortDrawer.HIGHLIGHTED_COLOR);
        return new CompositeAnimation(
            this.camera.ensureVisible(
                BubbleSortDrawer.SLIDE_DURATION,
                this.circles[pos],
                this.circles[pos + 1],
            ),
            new IdleAnimation(BubbleSortDrawer.COMP_IDLE),
        );
    }

    private handleSwap(step: Step): Animation {
        const { pos, end, lastSwapped } = step.payload;
        const left = this.circles[pos];
        const right = this.circles[pos + 1];
        this.circles[pos] = right;
        this.circles[pos + 1] = left;
        return new CompositeAnimation(
            new SwapAnimation(BubbleSortDrawer.SWAP_DURATION, left, right),
            new IdleAnimation(BubbleSortDrawer.SWAP_IDLE / 2),
            new ImmediateAnimation(() => {
                this.circles[pos].changeColor(BubbleSortDrawer.INITIAL_COLOR);
                this.circles[pos + 1].changeColor(BubbleSortDrawer.INITIAL_COLOR);
                if (pos + 1 === end) {
                    this.markFinished(lastSwapped + 1);
                }
            }),
            new IdleAnimation(BubbleSortDrawer.SWAP_IDLE / 2),
        );
    }

    private handleNoSwap(step: Step): Animation {
        const { pos, end, lastSwapped } = step.payload;
        this.circles[pos].changeColor(BubbleSortDrawer.INITIAL_COLOR);
        this.circles[pos + 1].changeColor(BubbleSortDrawer.INITIAL_COLOR);
        if (pos + 1 === end) {
            this.markFinished(lastSwapped + 1);
        }
        return new IdleAnimation(BubbleSortDrawer.NOSWAP_IDLE);
    }

    private markFinished(from: number) {
        for (let i = from; i < this.circles.length; ++i) {
            this.circles[i].changeColor(BubbleSortDrawer.FINISHED_COLOR);
        }
    }

    terminate(): void {
        for (let circle of this.circles) {
            circle.remove();
        }
    }
}
