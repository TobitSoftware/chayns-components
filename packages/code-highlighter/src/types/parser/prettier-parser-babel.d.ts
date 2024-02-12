declare module 'prettier/parser-babel' {
    import { Plugin } from 'prettier';

    const parser: Plugin;
    export default parser;
}
