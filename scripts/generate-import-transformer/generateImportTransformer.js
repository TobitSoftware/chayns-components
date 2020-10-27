/* eslint-disable import/no-extraneous-dependencies */

/**
 * This script automatically generates an import mapping for
 * `babel-plugin-transform-imports`. This was needed in older versions and now
 * only exists for backwards compatibility.
 *
 * This script basically walks the AST of the ESM entry of the package and adds
 * every default export that has been named into a lookup object. It then
 * generates a file that contains a function that resolves a named import to the
 * absolute import.
 */

const fs = require('fs-extra');
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');
const pkg = require('../../package.json');

const ESM_BASE_PATH = 'chayns-components/dist/esm/';

module.exports = async function generateImportTransformer() {
    const esmEntryFile = await fs.readFile(path.resolve(pkg.module), {
        encoding: 'utf-8',
    });

    const template = await fs.readFile(path.join(__dirname, './template.js'), {
        encoding: 'utf-8',
    });

    const ast = acorn.parse(esmEntryFile, {
        ecmaVersion: 'latest',
        sourceType: 'module',
    });

    const importLookupObject = {};

    walk.simple(ast, {
        ExportNamedDeclaration(node) {
            const { specifiers, source } = node;

            const defaultSpecifier = specifiers.find(
                (specifier) => specifier.local.name === 'default'
            );

            if (defaultSpecifier) {
                const exportName = defaultSpecifier.exported.name;

                const packageImportPath = path
                    .join(ESM_BASE_PATH, source.value)
                    .replace(/\\/g, '/');

                importLookupObject[exportName] = packageImportPath;
            }
        },
    });

    await fs.outputFile(
        path.resolve('lib/utils/babel/resolveAbsoluteImport.js'),
        template.replace(
            '__INSERT_LOOKUP_OBJECT__',
            JSON.stringify(importLookupObject, null, 4)
        )
    );
};
