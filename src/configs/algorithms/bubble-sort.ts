export default {
    params: [(x, y) => x <= y],
    data: Array(3000).fill(null).map(() => Math.floor(Math.random() * 100)),
};
