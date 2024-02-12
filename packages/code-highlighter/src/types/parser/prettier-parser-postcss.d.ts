declare module 'prettier/parser-postcss' {
    import { Plugin } from 'prettier';

    const parser: Plugin;
    export default parser;
}
