import TraceEvent from 'tracers/trace-event';
import Tracer from 'tracers';

export default class implements Tracer {
    private events: TraceEvent[] = [];

    trace(event: TraceEvent): void {
        this.events.push(event);
    }

    getTraces(): TraceEvent[] {
        return this.events;
    }

    clear(): void {
        this.events = [];
    }
}
