import Worker from "workers";

export default interface Visualizer {
    start(): Promise<void>;
    terminate(): void;
}
