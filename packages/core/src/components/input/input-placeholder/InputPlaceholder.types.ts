export enum InputPlaceholderMode {
    Default = 'default',
    Floating = 'floating',
}

export type InputPlaceholderProps = {
    hasValue: boolean;
    isInvalid: boolean;
    placeholder: string;
    placeholderMode: InputPlaceholderMode;
};
