declare module 'prettier/parser-html' {
    import { Plugin } from 'prettier';

    const parser: Plugin;
    export default parser;
}
