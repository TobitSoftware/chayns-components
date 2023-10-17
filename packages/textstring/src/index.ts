// noinspection JSUnusedGlobalSymbols

export { default as TextStringProvider } from './components/textstring-provider/TextStringProvider';
export { default as TextString } from './components/textstring/TextString';
export type {
    ITextstring as Textstring,
    TextstringReplacement,
} from './components/textstring/types';
export { useTextstringValue } from './utils/getTextstringValue';
