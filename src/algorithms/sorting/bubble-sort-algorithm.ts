import Algorithm from 'algorithms';
import State from 'algorithms/state';
import Step from 'algorithms/step';

interface CompareFunction<T> {
    (x: T, y: T): boolean;
}

class InitialState<T> implements State {
    constructor(private arr: T[], private compare: CompareFunction<T>) {
    }

    run() {
        const step = { done: false, type: 'init', payload: { data: this.arr.slice() } };
        let next: State;
        if (this.arr.length < 2) {
            next = new DoneState();
        } else {
            next = new CompareState(this.arr, this.compare, 0, this.arr.length - 1);
        }
        return { step, next };
    }
}

class DoneState implements State {
    run() {
        const step = { done: true, type: 'done', payload: null };
        const next = this;
        return { step, next };
    }
}

class CompareState<T> implements State {
    constructor(private arr: T[], private compare: CompareFunction<T>, private pos: number, private end: number, private swapped = false) {
    }

    run() {
        const step = { done: false, type: 'comp', payload: { pos: this.pos } };
        const next = new SwapState(this.arr, this.compare, this.pos, this.end, this.swapped);
        return { step, next };
    }
}

class SwapState<T> implements State {
    constructor(private arr: T[], private compare: CompareFunction<T>, private pos: number, private end: number, private swapped = false) {
    }

    run() {
        const i = this.pos;
        const j = i + 1;
        let step: Step;
        if (!this.compare(this.arr[i], this.arr[j])) {
            [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
            step = { done: false, type: 'swap', payload: { pos: this.pos } };
            this.swapped = true;
        } else {
            step = { done: false, type: 'noswap', payload: { pos: this.pos } };
        }
        const next = this.advance();
        return { step, next };
    }

    private advance(): State {
        ++this.pos;
        if (this.pos === this.end) {
            if (!this.swapped || this.end === 1) {
                return new DoneState();
            }
            this.pos = 0;
            --this.end;
            this.swapped = false;
        }
        return new CompareState(this.arr, this.compare, this.pos, this.end, this.swapped);
    }
}

export default class BubbleSort<T> implements Algorithm {
    private state: State;

    constructor(private arr: T[], private compare: (x: T, y: T) => boolean) {
        this.state = new InitialState(this.arr, this.compare);
    }

    public run() {
        const { step, next } = this.state.run();
        this.state = next;
        return step;
    }

    public getResult(): T[] {
        return this.arr;
    }
}
