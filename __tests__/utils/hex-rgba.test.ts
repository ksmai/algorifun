import hexRGBA from 'utils/hex-rgba';

type Case = [string, number, string, string];

describe('hexRGBA', () => {
    const successCases: Case[] = [
        ['#abcdef', 1, 'rgba(171,205,239,1)', 'converts 6 digits with #'],
        ['42390f', 0.9, 'rgba(66,57,15,0.9)', 'converts 6 digits without #'],
        ['#f0c', 0.3, 'rgba(255,0,204,0.3)', 'converts 3 digits with #'],
        ['123', 0, 'rgba(17,34,51,0)', 'converts 3 digits without #'],
    ]
    successCases.forEach(([hex, alpha, expected, description]) => {
        it(description, () => {
            const actual = hexRGBA(hex, alpha);
            expect(actual).toEqual(expected);
        });
    });

    const failureCases: Case[] = [
        ['zzz', 1, '', 'throws when hex digits are out of range'],
        ['#abx', 1, '', 'throws when hex digits are out of range'],
        ['12p34d', 1, '', 'throws when hex digits are out of range'],
        ['#12p34d', 1, '', 'throws when hex digits are out of range'],
        ['#fff', 2, '', 'throws when alpha is out of range'],
        ['#fff', -1, '', 'throws when alpha is out of range'],
        ['#aaaaaaa', 1, '', 'throws when wrong number of digits'],
        ['#aaaa', 1, '', 'throws when wrong number of digits'],
    ];
    failureCases.forEach(([hex, alpha, expected, description]) => {
        it(description, () => {
            expect(() => hexRGBA(hex, alpha)).toThrow();
        });
    });
});
