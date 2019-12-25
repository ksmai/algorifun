export default {
    params: [(x: number, y: number) => x <= y],
    data: Array(8).fill(null).map(() => Math.floor(Math.random() * 100)),
};
