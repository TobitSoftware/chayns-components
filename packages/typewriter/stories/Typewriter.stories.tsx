import { CodeHighlighter } from '@chayns-components/code-highlighter';
import { Input, TextArea } from '@chayns-components/core';
import { Meta, StoryFn } from '@storybook/react';
import { CursorType } from '../src';
import Typewriter, { TypewriterSpeed } from '../src/components/typewriter/Typewriter';

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
