import hexRGBA from 'utils/hex-rgba';

type Case = [string, number, string, string];

describe('hexRGBA', () => {
    const successCases: Case[] = [
        ['#abcdef', 42, 'rgba(171,205,239,42)', 'converts 6 digits with #'],
        ['42390f', 255, 'rgba(66,57,15,255)', 'converts 6 digits without #'],
        ['#f0c', 0, 'rgba(255,0,204,0)', 'converts 3 digits with #'],
        ['123', 1, 'rgba(17,34,51,1)', 'converts 3 digits without #'],
    ]
    successCases.forEach(([hex, alpha, expected, description]) => {
        it(description, () => {
            const actual = hexRGBA(hex, alpha);
            expect(actual).toEqual(expected);
        });
    });

    const failureCases: Case[] = [
        ['zzz', 42, '', 'throws when hex digits are out of range'],
        ['#abx', 42, '', 'throws when hex digits are out of range'],
        ['12p34d', 42, '', 'throws when hex digits are out of range'],
        ['#12p34d', 42, '', 'throws when hex digits are out of range'],
        ['#fff', 256, '', 'throws when alpha is out of range'],
        ['#fff', -1, '', 'throws when alpha is out of range'],
        ['#aaaaaaa', 42, '', 'throws when wrong number of digits'],
        ['#aaaa', 42, '', 'throws when wrong number of digits'],
    ];
    failureCases.forEach(([hex, alpha, expected, description]) => {
        it(description, () => {
            expect(() => hexRGBA(hex, alpha)).toThrow();
        });
    });
});
