import paper from 'paper';

interface Params {
    number: number;
    position: paper.Point;
    radius: number;
    color: paper.Color;
    fontSize?: number;
    fontWeight?: number;
}

export default class NumberedCircle extends paper.Group {
    constructor({
        number,
        position,
        radius,
        color,
        fontSize = radius,
        fontWeight = 700,
    }: Params) {
        super();
        const circle = new paper.Path.Circle(position, radius);
        circle.strokeColor = color;
        circle.strokeWidth = 5;
        const text = new paper.PointText(position);
        text.content = String(number);
        text.justification = 'center';
        text.fillColor = color;
        text.fontSize = fontSize;
        text.fontWeight = fontWeight;
        text.position.y += text.bounds.height / 3;
        this.addChild(circle);
        this.addChild(text);
    }

    changeColor(color: paper.Color) {
        const [circle, text] = this.children;
        circle.strokeColor = color;
        text.fillColor = color;
    }
}
