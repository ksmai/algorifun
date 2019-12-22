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
                if (this.comp(pos)) {
                    this.swap(pos);
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }
        this.tracer.trace({ type: 'done', payload: { data: this.arr } });
        return this.arr;
    }

    private init(inputs: T[], tracer: Tracer): void {
        this.arr = inputs.slice();
        this.tracer = tracer;
        this.tracer.trace({ type: 'init', payload: { data: inputs } });
    }

    private comp(pos: number): boolean {
        this.tracer.trace({ type: 'comp', payload: { pos } });
        return this.arr[pos] > this.arr[pos + 1];
    }

    private swap(pos: number): void {
        [this.arr[pos], this.arr[pos + 1]] = [this.arr[pos + 1], this.arr[pos]];
        this.tracer.trace({ type: 'swap', payload: { pos } });
    }
}
