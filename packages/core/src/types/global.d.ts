declare namespace React {
    interface HTMLAttributes<T> {
        inert?: boolean | string;
    }
}

interface Window {
    sharingCallback: (retVal: { status: 0 | -1 | -2 }) => void;
}
