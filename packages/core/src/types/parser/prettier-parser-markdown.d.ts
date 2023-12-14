declare module 'prettier/parser-markdown' {
    import { Plugin } from 'prettier';

    const parser: Plugin;
    export default parser;
}
