import Animation from 'visualizers/animations';

export default class CompositeAnimation implements Animation {
    private animations: Animation[];

    constructor(...animations: Animation[]) {
        this.animations = animations;
    }

    run(dt: number) {
        while (this.animations[0] && this.animations[0].isFinished()) {
            this.animations.shift();
        }
        if (this.animations.length === 0) {
            return;
        }
        this.animations[0].run(dt);
    }

    isFinished() {
        return this.animations.length === 0;
    }
}
