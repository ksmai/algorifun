import Tracer from "tracers";
import TraceEvent from "./trace-event";

export default class NullTracer implements Tracer {
    trace(event: TraceEvent): void {
    }

    getTraces(): TraceEvent[] {
        return [];
    }

    clear(): void {
    }
}
