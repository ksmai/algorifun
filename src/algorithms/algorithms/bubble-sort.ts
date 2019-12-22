import Algorithm from 'algorithms';
import Tracer from 'tracers';
import TraceEvent from 'tracers/trace-event';

export default class BubbleSort<T> implements Algorithm {
    private arr: T[];
    private tracer: Tracer;

    run(inputs: T[], tracer: Tracer): T[] {
        this.init(inputs, tracer);
        for (let end = this.arr.length - 1; end >= 1; --end) {
            let swapped = false;
            for (let pos = 0; pos < end; ++pos) {
                if (this.check(pos)) {
                    this.bubble(pos);
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }
        return this.arr;
    }

    private init(inputs: T[], tracer: Tracer): void {
        this.arr = inputs.slice();
        this.tracer = tracer;
        this.tracer.trace({ type: 'init', payload: { data: inputs.slice() } });
    }

    private check(pos: number): boolean {
        this.tracer.trace({ type: 'comp', payload: { pos } });
        return this.arr[pos] > this.arr[pos + 1];
    }

    private bubble(pos: number): void {
        [this.arr[pos], this.arr[pos + 1]] = [this.arr[pos + 1], this.arr[pos]];
        this.tracer.trace({ type: 'swap', payload: { pos } });
    }
}
