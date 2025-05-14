export class Deferred<T = any> {
    public promise: Promise<T>;

    public resolve!: (value: T) => void;

    public reject!: (reason?: any) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
