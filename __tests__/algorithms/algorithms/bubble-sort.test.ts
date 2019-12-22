import BubbleSort from 'algorithms/algorithms/bubble-sort';
import runToEnd from 'algorithms/run-to-end';

describe('BubbleSort', () => {
    const sort = (arr: number[]) => runToEnd(
        new BubbleSort(arr, (x, y) => x <= y)
    );

    it('can sort 0 items', () => {
        const actual = sort([]);
        const expected = [];
        expect(actual).toEqual(expected);
    });

    it('can sort 1 item', () => {
        const actual = sort([1]);
        const expected = [1];
        expect(actual).toEqual(expected);
    });

    it('can sort 2 ordered items', () => {
        const actual = sort([1, 2]);
        const expected = [1, 2];
        expect(actual).toEqual(expected);
    });

    it('can sort 2 out-of-order items', () => {
        const actual = sort([2, 1]);
        const expected = [1, 2];
        expect(actual).toEqual(expected);
    });

    it('can sort n items', () => {
        const actual = sort([2, 3, 7, 4, 6, 4, 4, 1, 0]);
        const expected = [0, 1, 2, 3, 4, 4, 4, 6, 7];
        expect(actual).toEqual(expected);
    });
});
