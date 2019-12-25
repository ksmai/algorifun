import paper from 'paper';

import Step from 'algorithms/step';
import Animation from 'visualizers/animations'

export default interface Drawer {
    handleStep(step: Step): Animation;
    terminate(): void;
}

export interface DrawerConstructor {
    new (view: paper.View): Drawer;
}
