declare module 'prettier/parser-graphql' {
    import { Plugin } from 'prettier';

    const parser: Plugin;
    export default parser;
}
