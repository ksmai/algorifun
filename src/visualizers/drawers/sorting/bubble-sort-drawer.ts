import paper from 'paper';

import Step from 'algorithms/step';
import Drawer from 'visualizers/drawers';
import NumberedCircle from 'visualizers/drawables/numbered-circle';
import IdleAnimation from 'visualizers/animations/idle-animation';
import EmptyAnimation from 'visualizers/animations/empty-animation';
import Animation from 'visualizers/animations';

export default class BubbleSortDrawer implements Drawer {
    private circles: NumberedCircle[];

    constructor(private width: number, private height: number) {
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
        const arr = step.payload.data;
        const radius = this.width / 30;
        const color = new paper.Color(1, 1, 1);
        const position = new paper.Point(radius * 2, this.height / 2);
        this.circles = arr.map((number: number, i: number) => {
            const circle = new NumberedCircle({
                number,
                radius,
                color,
                position: position.add(new paper.Point(radius * 3 * i, 0)),
            });
            return circle;
        });
        return new IdleAnimation(1);
    }

    private handleComp(step: Step): Animation {
        const { pos } = step.payload;
        const activeColor = new paper.Color('green');
        this.circles[pos].changeColor(activeColor);
        this.circles[pos + 1].changeColor(activeColor);
        return new IdleAnimation(1);
    }

    private handleSwap(step: Step): Animation {
        const { pos } = step.payload;
        const left = this.circles[pos];
        const right = this.circles[pos + 1];
        [left.position, right.position] = [right.position, left.position];
        this.circles[pos] = right;
        this.circles[pos + 1] = left;
        const white = new paper.Color(1, 1, 1);
        this.circles[pos].changeColor(white);
        this.circles[pos + 1].changeColor(white);
        return new IdleAnimation(1);
    }

    private handleNoSwap(step: Step): Animation {
        const { pos } = step.payload;
        const white = new paper.Color(1, 1, 1);
        this.circles[pos].changeColor(white);
        this.circles[pos + 1].changeColor(white);
        return new IdleAnimation(1);
    }

    terminate(): void {
        for (let circle of this.circles) {
            circle.remove();
        }
    }
}
