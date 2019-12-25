import Worker from 'workers';
import Step from 'algorithms/step';

export default class BufferedWorker implements Worker {
    private buffer: Array<Promise<Step>> = [];
    
    constructor(private size: number, private worker: Worker) {
    }

    async init(data: any) {
        await this.worker.init(data);
        this.buffer.push(this.worker.run());
        while (this.buffer.length < this.size) {
            this.bufferNext();
        }
        await this.buffer[this.buffer.length - 1];
    }

    async run() {
        const step = await this.buffer.shift();
        this.bufferNext();
        return step;
    }

    terminate() {
        this.worker.terminate();
        this.buffer = [];
    }

    private bufferNext(): void {
        this.buffer.push(
            this.buffer[this.buffer.length - 1].then(() => this.worker.run())
        )
    }
}
