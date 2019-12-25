import clampedAdd from 'utils/clamped-add';

describe('clampedAdd', () => {
    it('adds normally', () => {
        expect(clampedAdd(2, 3, 0, 10)).toEqual(5);
    });

    it('clamps the bottom', () => {
        expect(clampedAdd(0.2, -0.3, 0, 1)).toEqual(0);
    });

    it('clamps the top', () => {
        expect(clampedAdd(0.2, 0.9, 0, 1)).toEqual(1);
    });
});
