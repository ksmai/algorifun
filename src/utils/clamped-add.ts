export default function clampedAdd(x: number, y: number, min: number, max: number) {
    return Math.max(Math.min(x + y, max), min);
}
