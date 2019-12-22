import Tracer from 'tracers'

export default interface Algorithm {
    run(inputs: any, tracer: Tracer): any;
}
