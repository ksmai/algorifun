import paper from 'paper';

import clamp from 'utils/clamp'
import Animation from 'visualizers/animations';
import EmptyAnimation from 'visualizers/animations/empty-animation';
import SlideAnimation from 'visualizers/animations/slide-animation';

export default class Camera {
    private translate = new paper.Point(0, 0);

    constructor(private view: paper.View, private xmax: number, private ymax: number) {
    }

    ensureVisible(seconds: number, ...items: paper.Item[]): Animation {
        const bounds = items
            .map((item) => item.bounds)
            .reduce((union, rect) => union.unite(rect));
        const { width, height } = this.view.viewSize;
        const top = -this.translate.y;
        const left = -this.translate.x;
        const bottom = top + height;
        const right = left + width;
        const isVisible = top <= bounds.top &&
            left <= bounds.left &&
            bottom >= bounds.bottom &&
            right >= bounds.right;
        if (isVisible) {
            return new EmptyAnimation();
        }
        const xmid = (bounds.left + bounds.right) / 2;
        const ymid = (bounds.top + bounds.bottom) / 2;
        const prevTranslate = this.translate;
        this.translate = new paper.Point(
            clamp(-xmid + width / 2, -this.xmax + width, 0),
            clamp(-ymid + height / 2, -this.ymax + height, 0),
        );
        return new SlideAnimation(seconds, this.view, prevTranslate, this.translate);
    }
}
