import BubbleSort from 'algorithms/algorithms/bubble-sort';
import NullTracer from 'tracers/null-tracer';

describe('BubbleSort', () => {
    let sorter: BubbleSort<number>;
    let tracer = new NullTracer();

    beforeEach(() => {
        sorter = new BubbleSort<number>();
    });

    it('can sort 0 items', () => {
        const actual = sorter.run([], tracer);
        const expected = [];
        expect(actual).toEqual(expected);
    });

    it('can sort 1 item', () => {
        const actual = sorter.run([1], tracer);
        const expected = [1];
        expect(actual).toEqual(expected);
    });

    it('can sort 2 ordered items', () => {
        const actual = sorter.run([1, 2], tracer);
        const expected = [1, 2];
        expect(actual).toEqual(expected);
    });

    it('can sort 2 out-of-order items', () => {
        const actual = sorter.run([2, 1], tracer);
        const expected = [1, 2];
        expect(actual).toEqual(expected);
    });

    it('can sort n items', () => {
        const actual = sorter.run([2, 3, 7, 4, 6, 4, 4, 1, 0], tracer);
        const expected = [0, 1, 2, 3, 4, 4, 4, 6, 7];
        expect(actual).toEqual(expected);
    });
});
