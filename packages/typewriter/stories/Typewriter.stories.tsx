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
    const fullText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus leo nec arcu posuere, ut blandit arcu tincidunt. Quisque ac libero odio. In congue fermentum nulla, a eleifend mi aliquam sit amet. In hac habitasse platea dictumst. Sed ultricies ultricies felis at lacinia. Sed vel nisi bibendum nisl mollis placerat eget quis tortor. In pellentesque est nibh, at varius odio elementum eu. Proin consequat malesuada quam, sed lacinia sem. Pellentesque volutpat tellus id accumsan varius.

    Sed aliquam finibus sem. Nullam eros eros, facilisis eu mi eu, laoreet eleifend arcu. Mauris sit amet varius urna, sed vulputate orci. Vestibulum lobortis tortor tellus, sit amet auctor tellus pulvinar vitae. Sed magna massa, imperdiet ut semper at, blandit iaculis enim. Phasellus varius neque volutpat hendrerit laoreet. Ut in risus ac erat sodales mattis. Nulla id elit sapien. Aliquam vestibulum cursus sapien eu pharetra.

    Curabitur nec malesuada sapien, tincidunt tempor nisl. Vivamus ac nisi ornare, bibendum lorem a, molestie dolor. Aenean semper tellus velit, in semper eros molestie quis. Duis a efficitur nulla. Donec eget tincidunt erat. Maecenas congue, nisl quis semper vehicula, quam elit tincidunt erat, tristique ullamcorper libero mi id velit. Suspendisse ipsum sapien, vehicula id consectetur eget, tincidunt eu justo. Vivamus commodo, est eget fermentum faucibus, neque nisi molestie sem, eget sagittis elit urna sit amet enim. Ut eu mollis sem. Duis egestas nisl quis tempor eleifend. Pellentesque faucibus feugiat nulla, nec consectetur libero placerat aliquam. Maecenas blandit libero mi, ut porta lectus finibus eu. Donec convallis mi eu mi consectetur, non congue eros iaculis. Pellentesque fringilla nibh pretium diam dapibus, eget molestie arcu suscipit.

    Nam dapibus tristique sem eget sodales. Ut mauris neque, blandit non fermentum vitae, cursus vitae est. Donec eu purus nulla. Vestibulum dui dolor, consequat at mauris accumsan, malesuada pretium tellus. Praesent vel purus euismod, mollis ipsum a, tristique justo. Aliquam pharetra massa neque, quis sagittis diam tempus eu. Etiam congue, nulla in vulputate placerat, metus neque sollicitudin tellus, a sollicitudin est massa sit amet velit. Curabitur dictum quam non magna egestas, sit amet varius velit dignissim. Sed eget pretium felis. Quisque efficitur, ligula nec pharetra vehicula, mauris urna convallis sapien, vitae dictum orci eros maximus lacus. Sed eget cursus ipsum. Duis varius mi ac enim viverra consectetur. Praesent ullamcorper lacus vitae sem porta, non faucibus ante facilisis. Maecenas dui felis, sollicitudin et mi sed, condimentum pharetra ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

    Nam ultrices non eros et rutrum. Sed pharetra lacus non magna tincidunt ultrices. Suspendisse nec ligula lacinia, consequat nibh non, ultrices lorem. Etiam nec sollicitudin metus. Maecenas in ornare leo. Quisque tristique, risus vitae sollicitudin mollis, mi purus ultrices tortor, ac molestie diam lorem eget purus. Aliquam lacinia lorem ut fermentum hendrerit. Integer urna enim, porttitor et convallis sit amet, hendrerit et libero. Vestibulum dapibus congue odio, eget venenatis nibh efficitur euismod.
  `;

    const [text, setText] = useState('');

    const iteration = useRef(0);

    useEffect(() => {
        const maxIterations = 10;
        const textChunks = splitTextIntoChunks(fullText, maxIterations);

        const addTextWithRandomInterval = () => {
            if (iteration.current < maxIterations) {
                const delay = Math.random() * (1000 - 500) + 500;
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
