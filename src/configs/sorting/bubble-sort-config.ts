export default {
    params: [(x: number, y: number) => x <= y],
    data: () => Array(8).fill(null).map(() => Math.floor(Math.random() * 100)),
    validator: (data: any) => {
        if (!Array.isArray(data)) {
            return 'Data must be an array';
        }
        if (data.length < 2) {
            return 'Data must contain at least 2 elements';
        }
        if (!data.every((num) => typeof num === 'number')) {
            return 'Data must contain numbers only';
        }
        return '';
    },
};
