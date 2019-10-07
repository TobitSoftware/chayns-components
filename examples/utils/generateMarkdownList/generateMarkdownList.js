import fs from 'fs';
import { dirname, resolve } from 'path';

const ROOT_PATH = dirname(dirname(dirname(__dirname)));
const EXAMPLE_DEFINITION_PATH = resolve(ROOT_PATH, 'src', 'components.json');
const MARKDOWN_PATH = resolve(ROOT_PATH, 'README.md');

function normalize(value) {
    const len = [];

    value.forEach((v) => {
        v.forEach((d, i) => {
            len[i] = Math.max(len[i] || 0, d.length);
        });
    });

    return value.map(v => v.map((d, i) => d.padEnd(len[i], ' ')));
}

function toList(value) {
    let retVal = '';

    value.forEach((v, i) => {
        retVal += '| ';
        retVal += v.join(' | ');
        retVal += ' |\n';

        if (i === 0) {
            retVal += '|';
            retVal += v.map(d => '-'.repeat(d.length + 2)).join('|');
            retVal += '|\n';
        }
    });

    return retVal;
}

function bootstrap() {
    const examplesData = fs.readFileSync(EXAMPLE_DEFINITION_PATH);
    const examples = JSON.parse(examplesData);

    const data = examples.filter(d => d.readme && !d.group).sort((a, b) => a.title.localeCompare(b.title)).map((d) => {
        if (!d.readme) {
            return null;
        }

        return [
            `[${d.id}](/src/${d.id}/)`,
            `${d.title} Component`,
            `[Readme](/src/${d.id}/README.md)`,
        ];
    }).filter(d => d);

    const markdownList = `<!--- start component list -->\n${toList(normalize([['Component', 'Description', 'Readme File'], ...data]))}<!--- end component list -->`;

    const markdownFile = fs.readFileSync(MARKDOWN_PATH);
    const manipulatedMarkdown = String(markdownFile).replace(/<!--- start component list -->(.*)<!--- end component list -->/s, markdownList);

    fs.writeFileSync(MARKDOWN_PATH, manipulatedMarkdown);
}

bootstrap();
