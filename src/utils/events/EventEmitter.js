export default class EventEmitter {
    #events = [];

    constructor() {
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.emit = this.emit.bind(this);
        this.once = this.once.bind(this);
        this.removeListener = this.removeListener.bind(this);
    }


    on(event, listener) {
        if (!this.#events[event]) {
            this.#events[event] = [];
        }

        this.#events[event].push(listener);

        return this;
    }

    off(event, listener) {
        this.removeListener(event, listener);

        return this;
    }

    removeListener(event, listener) {
        if (this.#events[event]) {
            const idx = this.#events[event].indexOf(listener);
            if (idx > -1) {
                this.#events[event].splice(idx, 1);
            }
        }
    }

    emit(event, ...args) {
        if (this.#events[event]) {
            this.#events[event].forEach(listener => listener(...args));
        }
    }

    once(event, listener) {
        const listenerWrapper = (...args) => {
            this.removeListener(event, listenerWrapper);
            listener(...args);
        };

        this.on(event, listenerWrapper);
    }
}
