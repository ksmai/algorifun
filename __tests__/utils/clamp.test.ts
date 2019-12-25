import clamp from 'utils/clamp';

describe('clamp', () => {
    it('does not change valid numbers', () => {
        expect(clamp(5, 0, 10)).toEqual(5);
    });

    it('clamps the bottom', () => {
        expect(clamp(-0.1, 0, 1)).toEqual(0);
    });

    it('clamps the top', () => {
        expect(clamp(1.1, 0, 1)).toEqual(1);
    });
});
