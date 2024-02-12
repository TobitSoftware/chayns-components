declare module 'prettier/parser-yaml' {
    import { Plugin } from 'prettier';

    const parser: Plugin;
    export default parser;
}
