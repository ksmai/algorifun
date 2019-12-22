import TraceEvent from "tracers/trace-event";

export default interface Tracer {
    trace(event: TraceEvent): void;
    getTraces(): TraceEvent[];
    clear(): void;
}
