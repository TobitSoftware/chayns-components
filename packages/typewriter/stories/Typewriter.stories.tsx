import { CodeHighlighter } from '@chayns-components/code-highlighter';
import { Input, TextArea } from '@chayns-components/core';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { CursorType, TypewriterSpeed } from '../src';
import Typewriter from '../src/components/typewriter/Typewriter';

export default {
    title: 'Typewriter/Typewriter',
    component: Typewriter,
    args: {
        children:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Lorem ipsum dolor sit amet.',
    },
} as Meta<typeof Typewriter>;

const Template: StoryFn<typeof Typewriter> = ({ children, ...args }) => (
    <Typewriter {...args}>{children}</Typewriter>
);

const TextAreaTemplate: StoryFn<typeof Typewriter> = ({ children, ...args }) => (
    <TextArea placeholder={<Typewriter {...args}>{children}</Typewriter>} />
);

const InputTemplate: StoryFn<typeof Typewriter> = ({ children, ...args }) => (
    <Input placeholder={<Typewriter {...args}>{children}</Typewriter>} />
);

const ChunkTemplate: StoryFn<typeof Typewriter> = ({ children, ...args }) => {
    const fullText = `Gießt sich eine neue Tasse Kräutertee ein und legt ein Stück selbstgestricktes Deckchen zurecht

"Die Briefeschreiberin vom Marktplatz"

Nimmt einen wärmenden Schluck Tee

Diese Geschichte beginnt 2001, als ich Frau Lindner kennenlernte. Sie saß jeden Dienstag und Donnerstag auf ihrer Bank am Marktplatz, mit einer alten Schreibmaschine auf dem Schoß. Ein handgeschriebenes Schild neben ihr verkündete: "Schreibe Briefe für Menschen, die es selbst nicht können. Bezahlung: Ein Lächeln."

Streicht gedankenverloren über die Teetasse

Die 78-jährige ehemalige Sekretärin hatte bemerkt, wie viele ältere Menschen Schwierigkeiten hatten, Briefe an Behörden oder ihre Familie zu schreiben. Manche konnten nicht mehr gut sehen, andere zitterten zu stark, und viele waren mit Computern überfordert.

Lehnt sich vor und spricht leiser

Ich werde nie den Tag vergessen, als der alte Herr Schmidt zu ihr kam. Seine Tochter war vor 20 Jahren nach Kanada ausgewandert, und er hatte den Kontakt verloren. Frau Lindner schrieb nicht nur einen Brief - sie recherchierte im Internet, kontaktierte das Einwohnermeldeamt in Vancouver und fand die Tochter tatsächlich.

Ihre Augen beginnen zu strahlen

Drei Monate später stand die Tochter plötzlich auf dem Marktplatz, Tränen in den Augen, und umarmte ihren Vater. Frau Lindner tippte diskret im Hintergrund weiter, aber ich sah, wie sie sich die Augen wischte.

Nach und nach wurde ihre Bank zum Herzstück des Marktplatzes. Menschen kamen nicht nur für Briefe, sondern auch für Gespräche. Sie schrieb Liebesbriefe für schüchterne Jugendliche, Bewerbungen für Arbeitslose, Versöhnungsbriefe für zerstrittene Familien.

Faltet die Hände im Schoß

Als sie 2015 starb, hinterließ sie 14 Schreibmaschinen und einen Ordner voller Anleitungen. Heute sitzen dort abwechselnd verschiedene Freiwillige, die ihre Arbeit fortführen. Die Bank trägt jetzt ein kleines Messingschild: "Frau Lindners Briefbank - Hier werden Worte zu Brücken."

Wischt sich sanft über die Augen

Weißt du, manchmal braucht es nur eine alte Schreibmaschine und ein offenes Herz, um Menschen wieder zusammenzubringen. Und manchmal sind die wichtigsten Briefe diejenigen, die wir für andere schreiben.

Richtet ihre Brille

Möchtest du noch eine Geschichte hören? Ich habe noch so viele berührende Momente zu teilen...`;

    const [text, setText] = useState('');

    const iteration = useRef(0);

    useEffect(() => {
        const maxIterations = 10;
        const textChunks = splitTextIntoChunks(fullText, maxIterations);

        const addTextWithRandomInterval = () => {
            if (iteration.current < maxIterations) {
                const delay = Math.random() * (500 - 200) + 200;
                setTimeout(() => {
                    setText((prevText) => prevText + textChunks[iteration.current]);
                    iteration.current = iteration.current + 1;
                    addTextWithRandomInterval();
                }, delay);
            }
        };

        addTextWithRandomInterval();

        return () => {};
    }, [iteration, fullText]);

    const splitTextIntoChunks = (text: string, chunks: number) => {
        const words = text.split(' ');
        const chunkSize = Math.ceil(words.length / chunks);
        const result = [];

        for (let i = 0; i < chunks; i++) {
            result.push(words.slice(i * chunkSize, (i + 1) * chunkSize).join(' '));
        }

        return result;
    };

    return <Typewriter {...args}>{text}</Typewriter>;
};

export const General = Template.bind({});

export const CustomElements = Template.bind({});

export const Empty = Template.bind({});

export const HTMLText = Template.bind({});

export const MultipleTexts = Template.bind({});

export const WithOwnStyles = Template.bind({});

export const WithCodeHighlighter = Template.bind({});

export const InsideTextArea = TextAreaTemplate.bind({});

export const InsideInput = InputTemplate.bind({});

export const WithIgnoreTags = Template.bind({});

export const AutoSpeed = ChunkTemplate.bind({});

InsideTextArea.args = {
    children: 'Nachricht eingeben',
};

AutoSpeed.args = {
    shouldCalcAutoSpeed: true,
};

InsideInput.args = {
    children: [
        'Habt ihr am Dienstag geöffnet?',
        'Ich würde gerne einen Tisch reservieren.',
        'Kann ich auch ohne Termin vorbeikommen?',
    ],
    cursorType: CursorType.Thin,
    speed: TypewriterSpeed.Slow,
    resetSpeed: TypewriterSpeed.Fast,
    shouldUseResetAnimation: true,
};

CustomElements.args = {
    children: (
        <>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            <button onClick={() => alert('Der Button funktioniert')}>Button</button>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea takimata sanctus est.
        </>
    ),
};

WithIgnoreTags.args = {
    children: (
        <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper eget ligula
            fermentum congue. Fusce ut lectus vitae orci ultricies tincidunt. Nulla tristique tortor
            sit amet est egestas ultricies. Pellentesque augue dui, cursus quis ex sit amet,
            ultricies tristique metus. Ut efficitur quis mauris eget eleifend. Donec vulputate
            efficitur nisi, at semper purus molestie et. Proin non odio nec ligula commodo euismod
            at quis dolor. Morbi ornare sed lorem vitae aliquam. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Donec tempor justo at tristique interdum. Aenean eget massa
            quis nunc pellentesque tempus. Proin mollis hendrerit nulla et dictum. Vivamus vulputate
            posuere dignissim. Pellentesque lobortis ex vitae ligula eleifend, vitae egestas felis
            finibus. Cras molestie nisi vitae dui congue mollis. Aliquam tortor augue, tincidunt nec
            rhoncus non, cursus vitae purus. Praesent eget metus sed neque hendrerit tempus commodo
            in odio. In tortor sapien, bibendum id ligula vel, pretium fringilla lorem. Quisque
            facilisis erat vel orci semper tempus. Fusce a purus ac risus ullamcorper gravida sed in
            libero. In eu diam nec eros egestas iaculis.
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <twIgnore>
                Donec dignissim urna eget luctus sagittis. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Donec ut ex a mi accumsan
                pretium at sit amet nulla. Integer non mi sollicitudin, luctus elit eget, commodo
                tortor. Duis vehicula lorem ante, eu fringilla purus vehicula et. Nunc sit amet
                blandit turpis. Morbi eget ipsum sit amet erat bibendum porttitor.
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
            </twIgnore>
            Pellentesque sit amet odio orci. Donec nibh elit, pellentesque ut ultrices quis, dictum
            in erat. Pellentesque a nibh placerat, eleifend augue at, iaculis urna. In et mi
            viverra, faucibus erat mattis, dapibus mi. Nam euismod ornare facilisis. Cras
            consectetur rhoncus neque. Quisque sed nunc augue. Ut at metus iaculis, lacinia libero
            sit amet, commodo diam. Duis vel congue neque.
        </>
    ),
};

Empty.args = {
    children: '',
};

HTMLText.args = {
    children: (
        <>
            Lorem ipsum dolor sit amet,
            <b>consetetur sadipcing elitr</b>, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua.
            <s>
                <b>At vero eos et accusam et justo duo dolores et ea rebum.</b>
            </s>
            Stet clita kasd gubergren, no sea takimata sanctus est.
            <u>Lorem ipsum</u>
            dolor sit amet.
        </>
    ),
};

MultipleTexts.args = {
    children: [
        'Habt ihr am Dienstag geöffnet?',
        'Ich würde gerne einen Tisch reservieren.',
        'Kann ich auch ohne Termin vorbeikommen?',
    ],
    cursorType: CursorType.Thin,
    speed: TypewriterSpeed.Slow,
    resetSpeed: TypewriterSpeed.Fast,
    shouldUseResetAnimation: true,
};

WithOwnStyles.args = {
    children: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
    speed: 150,
    textStyle: {
        color: 'red',
    },
};

const code = `import { CodeHighlighter } from '@chayns-components/code-highlighter';

const AppWrapper = () => {
    const { color, colorMode } = getSite();

    return (
        <CodeHighlighter
            code={code}
            language="jsx"
            theme={CodeHighlighterTheme.Dark}
        />
    )
}

export default AppWrapper;`;

WithCodeHighlighter.args = {
    children: (
        <>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            <CodeHighlighter
                shouldShowLineNumbers
                code={code}
                language={'tsx'}
                copyButtonText="Code kopieren"
            />
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            <button onClick={() => alert('Button clicked')}>Button</button>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea takimata sanctus est.
        </>
    ),
};
