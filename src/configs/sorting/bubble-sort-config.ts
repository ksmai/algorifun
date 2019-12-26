export default {
    params: [(x: number, y: number) => x <= y],
    data: () => Array(8).fill(null).map(() => Math.floor(Math.random() * 100)),
    validator: (data: any) => (
        Array.isArray(data) &&
        data.length > 1 &&
        data.every((num) => typeof num === 'number')
    ),
};
