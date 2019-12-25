export default interface Animation {
    isFinished(): boolean;
    run(dt: number): void;
}
