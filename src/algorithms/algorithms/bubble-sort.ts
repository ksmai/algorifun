import Algorithm from 'algorithms';

export default class BubbleSort<T> implements Algorithm {
    private end: number;
    private pos: number = 0;
    private swapped: boolean = false;
    private started = false;
    private done = false;
    private compared = false;

    constructor(private arr: T[], private compare: (x: T, y: T) => boolean) {
        if (this.arr.length < 2) {
            this.done = true;
        }
        this.end = this.arr.length - 1;
    }

    public run() {
        while (true) {
            if (!this.started) {
                this.started = true;
                return { done: false, type: 'init', payload: { data: this.arr.slice() } };
            }
            if (this.done) {
                return { done: true, type: 'done', payload: null };
            }
            if (!this.compared) {
                this.compared = true;
                return { done: false, type: 'comp', payload: { pos: this.pos } };
            }
            if (!this.compare(this.arr[this.pos], this.arr[this.pos + 1])) {
                this.compared = false;
                this.swapped = true;
                [this.arr[this.pos], this.arr[this.pos + 1]] = [this.arr[this.pos + 1], this.arr[this.pos]];
                const step = { done: false, type: 'swap', payload: { pos: this.pos } };
                this.advance();
                return step;
            } else {
                this.advance();
                this.compared = false;
            }
        }
    }

    public getResult(): T[] {
        return this.arr;
    }

    private advance(): void {
        ++this.pos;
        if (this.pos === this.end) {
            if (!this.swapped || this.end === 1) {
                this.done = true;
                return;
            }
            this.pos = 0;
            --this.end;
            this.swapped = false;
        }
    }
}
