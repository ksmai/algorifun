import Tracer from 'tracers/tracer';
import TraceEvent from 'tracers/trace-event';

describe('Tracer', () => {
    const events: TraceEvent[] = [
        { type: 'test', payload: 123 },
        { type: 'test2', payload: 'abc' },
        { type: 'test3', payload: { x: 1, y: { z: 2 } } },
    ];

    let tracer: Tracer;

    beforeEach(() => {
        tracer = new Tracer();
    });

    it('can trace 0 events', () => {
        expect(tracer.getTraces()).toEqual([]);
    });

    it('can trace 1 event', () => {
        tracer.trace(events[0]);
        expect(tracer.getTraces()).toEqual(events.slice(0, 1));
    });

    it('can trace n events', () => {
        events.forEach((event) => tracer.trace(event));
        expect(tracer.getTraces()).toEqual(events);
    });

    it('can be cleared', () => {
        events.forEach((event) => tracer.trace(event));
        expect(tracer.getTraces()).not.toEqual([]);
        tracer.clear();
        expect(tracer.getTraces()).toEqual([]);
    });
});
