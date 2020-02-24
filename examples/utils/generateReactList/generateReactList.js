import fs from 'fs';
import { resolve, dirname } from 'path';

const ROOT_PATH = dirname(dirname(dirname(__dirname)));
const EXAMPLE_DEFINITION_PATH = resolve(ROOT_PATH, 'src', 'components.json');
const EXAMPLE_OUTPUT_PATH = resolve(ROOT_PATH, 'examples', 'ExampleList.jsx');

const ITEM_TEMPLATE = fs.readFileSync(resolve(__dirname, 'templates', 'ListItem.txt')).toString();
const LIST_TEMPLATE = fs.readFileSync(resolve(__dirname, 'templates', 'List.txt')).toString();

function bootstrap() {
    const examplesData = fs.readFileSync(EXAMPLE_DEFINITION_PATH);
    const examples = JSON.parse(examplesData);

    const imports = [];
    const usages = [];

    examples.filter((d) => d.example).sort((a, b) => a.title.localeCompare(b.title)).forEach((data, index) => {
        const importName = `Example${index}`;

        imports.push(`import ${importName} from './${data.example}';`);

        usages.push(ITEM_TEMPLATE
            .replace('##id##', data.id)
            .replace('##headline##', data.title)
            .replace('##examplePath##', data.example)
            .replace('##readme##', data.readme ? 'true' : 'false')
            .replace('##importName##', importName));
    });

    const outputData = LIST_TEMPLATE
        .replace('##imports##', imports.join('\n'))
        .replace('##children##', usages.join('\n'));

    fs.writeFileSync(EXAMPLE_OUTPUT_PATH, outputData);

    console.log('Generated example files');
}

bootstrap();
