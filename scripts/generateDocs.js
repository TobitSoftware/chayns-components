/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
const glob = require('fast-glob');
const fs = require('fs');
const { promisify } = require('util');
const docGen = require('react-docgen');
const path = require('path');
const prettier = require('prettier');
const { kebabCase } = require('lodash');
const { outputFile } = require('fs-extra');

const readFileAsync = promisify(fs.readFile);

const componentRegex = /^\/\*\*.*@component(?: \{(.*?)\})?.*?\*\//s;
const jsGlob = 'src/**/*.{js,jsx}';

glob(jsGlob).then(async (paths) => {
    const filePromises = paths.map(async (filePath) => {
        const content = await readFileAsync(filePath, { encoding: 'utf-8' });

        return { filePath, content };
    });

    const files = await Promise.all(filePromises);

    const componentFiles = files
        .filter((file) => componentRegex.test(file.content))
        .map((file) => {
            const matches = componentRegex.exec(file.content);

            return {
                ...file,
                docsPath: matches[1] ? matches[1] : null,
            };
        });

    const componentPromises = componentFiles.map(async (file) => {
        const { content, docsPath, filePath } = file;

        const info = docGen.parse(content, null, null, {
            cwd: path.resolve('src'),
        });

        const docs = docsPath
            ? await readFileAsync(path.join(filePath, '../', docsPath))
            : '';

        return { ...file, info, docs };
    });

    const components = await Promise.all(componentPromises);

    const template = await readFileAsync(
        path.join(__dirname, 'docgen-templates', 'component.md'),
        { encoding: 'utf-8' }
    );

    let prettierOptions = null;

    components.forEach(async (component) => {
        const { displayName, description, props } = component.info;

        let propTable = `
| Name | Type | Default | Required |
| ---- | ---- | ------- | :------: |
        `;

        let propDescriptions = '';

        if (props) {
            Object.entries(props).forEach(([propName, propInfo], index) => {
                const {
                    description: propDescription,
                    type,
                    required,
                    defaultValue,
                } = propInfo;

                if (!propDescription) return;

                const typeString = `\`${formatType(type)}\``;
                const formattedDescription = propDescription.replace(
                    /\r\n|\r|\n/g,
                    ' '
                );
                let defaultValueString = '';

                if (defaultValue) {
                    if (!['undefined', 'null'].includes(defaultValue.value)) {
                        defaultValueString = `\`${defaultValue.value}\``.replace(
                            /[\r\n]+/g,
                            ' '
                        );
                    }
                }

                const requiredString = required ? '✓' : '';

                propTable += `| [${propName}](#${propName.toLowerCase()}) | ${typeString} | ${defaultValueString} | ${requiredString} |\n`;

                propDescriptions += `${
                    index > 0 ? '---\n\n' : ''
                }### \`${propName}\`\n\n\`\`\`ts\n${propName}${
                    required ? '' : '?'
                }: ${formatType(type)}\n\`\`\`\n\n${formattedDescription}\n\n`;
            });
        }

        const templateWithReplacements = replace(template, {
            name: displayName,
            description,
            propTable,
            propDescriptions,
            docs: component.docs,
        });

        if (!prettierOptions) {
            prettierOptions = await prettier.resolveConfig(
                path.resolve(component.filePath)
            );
        }

        const formattedDocs = prettier.format(templateWithReplacements, {
            ...prettierOptions,
            semi: false,
            parser: 'markdown',
        });

        await outputFile(
            path.resolve(`docs/components/${kebabCase(displayName)}.md`),
            formattedDocs
        );
    });
});

function replace(input, replacementMap) {
    let returnValue = input;

    for (const [match, replacement] of Object.entries(replacementMap)) {
        returnValue = returnValue.replace(
            new RegExp(`\\{\\{ ${match} \\}\\}`, 'g'),
            replacement
        );
    }

    return returnValue;
}

function formatType(type) {
    switch (type.name) {
        case 'union':
            return type.value.map((t) => formatType(t)).join(' | ');
        case 'shape': {
            const objectEntries = Object.entries(type.value)
                .map(([name, t]) => `${name}: ${formatType(t)}`)
                .join(', ');

            return `{ ${objectEntries} }`;
        }
        case 'arrayOf':
            return `Array<${formatType(type.value)}>`;
        case 'objectOf':
            return `{ [key: string]: ${formatType(type.value)} }`;
        case 'func':
            return 'function';
        case 'bool':
            return 'boolean';
        case 'node':
            return 'ReactNode';
        case 'instanceOf':
            return type.value;
        default:
            return `${type.name}`;
    }
}
