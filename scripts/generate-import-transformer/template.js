const chalk = require('chalk');
const boxen = require('boxen');

const LOOKUP_OBJECT = __INSERT_LOOKUP_OBJECT__;

const WARNING = boxen(
    `${chalk.bold.yellowBright('WARNING')}

Using ${chalk.cyanBright(
        '`babel-plugin-transform-imports`'
    )} with the ${chalk.magentaBright('`resolveAbsoluteImport`')} function
from ${chalk.cyanBright(
        '`chayns-components`'
    )} is no longer needed. While this function still exists,
it basically does nothing and will be removed with the next major version.

Please remove the babel-plugin from your configuration or use our preconfigured
${chalk.greenBright(
    '`chayns-toolkit`'
)} (https://github.com/TobitSoftware/chayns-toolkit).`,
    {
        padding: 1,
        margin: { top: 1, bottom: 1 },
        borderColor: 'yellowBright',
        borderStyle: 'round',
    }
);
console.warn(WARNING);

module.exports = function resolveAbsoluteImport(importName) {
    const importPath = LOOKUP_OBJECT[importName];

    if (!importPath) {
        throw new Error(
            `Unable to resolve ${importName} from chayns-components. Please check the spelling. If it's not wrong please create an issue (https://github.com/TobitSoftware/chayns-components/issues).`
        );
    }

    return importPath;
};
