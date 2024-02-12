// JavaScript/TypeScript
import parserBabel from 'prettier/parser-babel';

// HTML
import parserHtml from 'prettier/parser-html';

// CSS
import parserPostcss from 'prettier/parser-postcss';

// Markdown
import parserMarkdown from 'prettier/parser-markdown';

// GraphQL
import parserGraphql from 'prettier/parser-graphql';

// YAML
import parserYaml from 'prettier/parser-yaml';

import type { Options } from 'prettier';
import {
    BABEL_LANGUAGES,
    CSS_LANGUAGES,
    GRAPHQL_LANGUAGES,
    HTML_LANGUAGES,
    MARKDOWN_LANGUAGES,
    YAML_LANGUAGES,
} from '../constants/codeHighlighter';
import type { CodeHighlighterLanguage } from '../types/codeHighlighter';

export const getParserForLanguage = (language: CodeHighlighterLanguage): Options | undefined => {
    let parser: Options['parser'];
    let plugin;

    switch (true) {
        case BABEL_LANGUAGES.includes(language):
            parser = 'babel-ts';
            plugin = parserBabel;
            break;
        case HTML_LANGUAGES.includes(language):
            parser = 'html';
            plugin = parserHtml;
            break;
        case CSS_LANGUAGES.includes(language):
            parser = 'css';
            plugin = parserPostcss;
            break;
        case MARKDOWN_LANGUAGES.includes(language):
            parser = 'markdown';
            plugin = parserMarkdown;
            break;
        case GRAPHQL_LANGUAGES.includes(language):
            parser = 'graphql';
            plugin = parserGraphql;
            break;
        case YAML_LANGUAGES.includes(language):
            parser = 'yaml';
            plugin = parserYaml;
            break;
        default:
            break;
    }

    if (parser && plugin) {
        return {
            trailingComma: 'all',
            bracketSpacing: true,
            singleQuote: true,
            jsxSingleQuote: true,
            bracketSameLine: false,
            arrowParens: 'always',
            proseWrap: 'always',
            parser,
            plugins: [plugin],
        };
    }

    return undefined;
};

export const formatLanguage = (language: CodeHighlighterLanguage): string => {
    if (!language) {
        return '';
    }

    const formattedLanguage: { [key: string]: string } = {
        abap: 'ABAP',
        abnf: 'ABNF',
        actionscript: 'ActionScript',
        ada: 'Ada',
        agda: 'Agda',
        al: 'AL',
        antlr4: 'ANTLR4',
        apacheconf: 'ApacheConf',
        apex: 'Apex',
        apl: 'APL',
        applescript: 'AppleScript',
        aql: 'AQL',
        arduino: 'Arduino',
        arff: 'ARFF',
        asciidoc: 'AsciiDoc',
        asm6502: 'ASM6502',
        asmatmel: 'ASMatmel',
        aspnet: 'ASP.NET',
        autohotkey: 'AutoHotKey',
        autoit: 'AutoIt',
        avisynth: 'AviSynth',
        avroIdl: 'Avro IDL',
        bash: 'Bash',
        basic: 'Basic',
        batch: 'Batch',
        bbcode: 'BBCode',
        bicep: 'Bicep',
        birb: 'Birb',
        bison: 'Bison',
        bnf: 'BNF',
        brainfuck: 'Brainfuck',
        brightscript: 'BrightScript',
        bro: 'Bro',
        bsl: 'BSL',
        c: 'C',
        cfscript: 'CFScript',
        chaiscript: 'ChaiScript',
        cil: 'CIL',
        clike: 'C-like',
        clojure: 'Clojure',
        cmake: 'CMake',
        cobol: 'COBOL',
        coffeescript: 'CoffeeScript',
        concurnas: 'Concurnas',
        coq: 'Coq',
        cpp: 'C++',
        crystal: 'Crystal',
        csharp: 'C#',
        cshtml: 'CSHTML',
        csp: 'CSP',
        cssExtras: 'CSS Extras',
        css: 'CSS',
        csv: 'CSV',
        cypher: 'Cypher',
        d: 'D',
        dart: 'Dart',
        dataweave: 'DataWeave',
        dax: 'DAX',
        dhall: 'Dhall',
        diff: 'Diff',
        django: 'Django',
        dnsZoneFile: 'DNS Zone File',
        docker: 'Docker',
        dot: 'DOT',
        ebnf: 'EBNF',
        editorconfig: 'EditorConfig',
        eiffel: 'Eiffel',
        ejs: 'EJS',
        elixir: 'Elixir',
        elm: 'Elm',
        erb: 'ERB',
        erlang: 'Erlang',
        etlua: 'ETLua',
        excelFormula: 'Excel Formula',
        factor: 'Factor',
        falselang: 'Falselang',
        firestoreSecurityRules: 'Firestore Security Rules',
        flow: 'Flow',
        fortran: 'Fortran',
        fsharp: 'F#',
        ftl: 'FTL',
        gap: 'GAP',
        gcode: 'G-code',
        gdscript: 'GDScript',
        gedcom: 'GEDCOM',
        gherkin: 'Gherkin',
        git: 'Git',
        glsl: 'GLSL',
        gml: 'GML',
        gn: 'GN',
        goModule: 'Go Module',
        go: 'Go',
        graphql: 'GraphQL',
        groovy: 'Groovy',
        haml: 'Haml',
        handlebars: 'Handlebars',
        haskell: 'Haskell',
        haxe: 'Haxe',
        hcl: 'HCL',
        hlsl: 'HLSL',
        hoon: 'Hoon',
        hpkp: 'HPKP',
        hsts: 'HSTS',
        html: 'HTML',
        http: 'HTTP',
        ichigojam: 'IchigoJam',
        icon: 'Icon',
        icuMessageFormat: 'ICU Message Format',
        idris: 'Idris',
        iecst: 'IECST',
        ignore: 'Ignore',
        inform7: 'Inform7',
        ini: 'INI',
        io: 'Io',
        j: 'J',
        java: 'Java',
        javadoc: 'Javadoc',
        javadoclike: 'Javadoc-like',
        javascript: 'JavaScript',
        javastacktrace: 'Java Stack Trace',
        jexl: 'JEXL',
        jolie: 'Jolie',
        jq: 'jq',
        jsExtras: 'JS Extras',
        jsTemplates: 'JS Templates',
        jsdoc: 'JSDoc',
        json: 'JSON',
        json5: 'JSON5',
        jsonp: 'JSONP',
        jsstacktrace: 'JS Stack Trace',
        jsx: 'JSX',
        julia: 'Julia',
        keepalived: 'Keepalived',
        keyman: 'Keyman',
        kotlin: 'Kotlin',
        kumir: 'KuMir',
        kusto: 'Kusto',
        latex: 'LaTeX',
        latte: 'Latte',
        less: 'Less',
        lilypond: 'LilyPond',
        liquid: 'Liquid',
        lisp: 'Lisp',
        livescript: 'LiveScript',
        llvm: 'LLVM',
        log: 'Log',
        lolcode: 'LOLCODE',
        lua: 'Lua',
        magma: 'Magma',
        makefile: 'Makefile',
        markdown: 'Markdown',
        markupTemplating: 'Markup Templating',
        markup: 'Markup',
        matlab: 'MATLAB',
        maxscript: 'MAXScript',
        mel: 'MEL',
        mermaid: 'Mermaid',
        mizar: 'Mizar',
        mongodb: 'MongoDB',
        monkey: 'Monkey',
        moonscript: 'MoonScript',
        n1ql: 'N1QL',
        n4js: 'N4JS',
        nand2tetrisHdl: 'Nand2Tetris HDL',
        naniscript: 'NaninScript',
        nasm: 'NASM',
        neon: 'NEON',
        nevod: 'NevoD',
        nginx: 'Nginx',
        nim: 'Nim',
        nix: 'Nix',
        nsis: 'NSIS',
        objectivec: 'Objective-C',
        ocaml: 'OCaml',
        opencl: 'OpenCL',
        openqasm: 'OpenQasm',
        oz: 'Oz',
        parigp: 'PARI/GP',
        parser: 'Parser',
        pascal: 'Pascal',
        pascaligo: 'Pascaligo',
        pcaxis: 'PC-Axis',
        peoplecode: 'PeopleCode',
        perl: 'Perl',
        phpExtras: 'PHP Extras',
        php: 'PHP',
        phpdoc: 'PHPDoc',
        plsql: 'PL/SQL',
        powerquery: 'PowerQuery',
        powershell: 'PowerShell',
        processing: 'Processing',
        prolog: 'Prolog',
        promql: 'PromQL',
        properties: 'Properties',
        protobuf: 'Protocol Buffers',
        psl: 'PSL',
        pug: 'Pug',
        puppet: 'Puppet',
        pure: 'Pure',
        purebasic: 'PureBasic',
        purescript: 'PureScript',
        python: 'Python',
        q: 'Q',
        qml: 'QML',
        qore: 'Qore',
        qsharp: 'Q#',
        r: 'R',
        racket: 'Racket',
        reason: 'Reason',
        regex: 'RegExp',
        rego: 'Rego',
        renpy: 'RenPy',
        rest: 'reST',
        rip: 'Rip',
        roboconf: 'Roboconf',
        robotframework: 'Robot Framework',
        ruby: 'Ruby',
        rust: 'Rust',
        sas: 'SAS',
        sass: 'Sass',
        scala: 'Scala',
        scheme: 'Scheme',
        scss: 'SCSS',
        shellSession: 'Shell Session',
        smali: 'Smali',
        smalltalk: 'Smalltalk',
        smarty: 'Smarty',
        sml: 'SML',
        solidity: 'Solidity',
        solutionFile: 'Solution File',
        soy: 'Soy',
        sparql: 'SPARQL',
        splunkSpl: 'Splunk SPL',
        sqf: 'SQF',
        sql: 'SQL',
        squirrel: 'Squirrel',
        stan: 'Stan',
        stylus: 'Stylus',
        swift: 'Swift',
        systemd: 'systemd',
        t4Cs: 'T4CS',
        t4Templating: 'T4 Templating',
        t4Vb: 'T4VB',
        tap: 'TAP',
        tcl: 'Tcl',
        textile: 'Textile',
        toml: 'TOML',
        tremor: 'Tremor',
        tsx: 'TSX',
        tt2: 'TT2',
        turtle: 'Turtle',
        twig: 'Twig',
        typescript: 'TypeScript',
        typoscript: 'TypoScript',
        unrealscript: 'UnrealScript',
        uorazor: 'Uorazor',
        uri: 'URI',
        v: 'V',
        vala: 'Vala',
        vbnet: 'VB.NET',
        velocity: 'Velocity',
        verilog: 'Verilog',
        vhdl: 'VHDL',
        vim: 'Vim',
        visualBasic: 'Visual Basic',
        warpscript: 'WarpScript',
        wasm: 'WebAssembly',
        webIdl: 'WebIDL',
        wiki: 'Wiki',
        wolfram: 'Wolfram',
        wren: 'Wren',
        xeora: 'Xeora',
        xmlDoc: 'XML Doc',
        xojo: 'Xojo',
        xquery: 'XQuery',
        yaml: 'YAML',
        yang: 'YANG',
        zig: 'Zig',
    };

    return formattedLanguage[language] || language;
};
