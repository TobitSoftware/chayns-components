import { Meta, StoryFn } from '@storybook/react';
import Typewriter from '../src/components/typewriter/Typewriter';

const meta = {
    title: 'Typewriter/Typewriter',
    component: Typewriter,
    args: {
        children:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Lorem ipsum dolor sit amet.',
    },
} as Meta<typeof Typewriter>;

export default meta;

const Template: StoryFn<typeof Typewriter> = ({ children, ...args }) => (
    <Typewriter {...args}>{children}</Typewriter>
);

export const General = Template.bind({});

export const CustomElements = Template.bind({});

export const Empty = Template.bind({});

export const HTMLText = Template.bind({});

export const MultipleTexts = Template.bind({});

export const WithOwnStyles = Template.bind({});

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
    children:
        'Lorem ipsum dolor sit amet, <b>consetetur sadipscing elitr</b>, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <s><b>At vero eos et accusam et justo duo dolores et ea rebum.</b></s> Stet clita kasd gubergren, no sea takimata sanctus est. <u>Lorem ipsum</u> dolor sit amet.',
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
