export enum CodeHighlighterTheme {
    Light = 'light',
    Dark = 'dark',
}

export interface HighlightedLines {
    added?: number[];
    removed?: number[];
    marked?: number[];
}
