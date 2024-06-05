import { CodeHighlighter } from '@chayns-components/code-highlighter';
import { TextArea } from '@chayns-components/core';
import { Meta, StoryFn } from '@storybook/react';
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

export const General = Template.bind({});

export const CustomElements = Template.bind({});

export const Empty = Template.bind({});

export const HTMLText = Template.bind({});

export const MultipleTexts = Template.bind({});

export const WithOwnStyles = Template.bind({});

export const WithCodeHighlighter = Template.bind({});

export const InsideTextArea = TextAreaTemplate.bind({});

InsideTextArea.args = {
    children: 'Nachricht eingeben',
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
        'Hmm, ich würde sagen...',
        'Ich bin mir nicht ganz sicher...',
        'Lass mich kurz nachdenken...',
        'Nochmal von vorne...',
    ],
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
            <CodeHighlighter shouldShowLineNumbers code={code} language={'tsx'} />
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            <button onClick={() => alert('Button clicked')}>Button</button>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea takimata sanctus est.
        </>
    ),
};
