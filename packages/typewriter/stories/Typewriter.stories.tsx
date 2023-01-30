import { ComponentMeta, ComponentStory } from '@storybook/react';
import Typewriter from '../src/components/typewriter/Typewriter';

export default {
    title: 'Typewriter/Typewriter',
    component: Typewriter,
    args: {
        children:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Lorem ipsum dolor sit amet.',
    },
} as ComponentMeta<typeof Typewriter>;

const Template: ComponentStory<typeof Typewriter> = ({ children, ...args }) => (
    <Typewriter {...args}>{children}</Typewriter>
);

export const General = Template.bind({});

export const WithHTMLText = Template.bind({});

WithHTMLText.args = {
    children:
        'Lorem ipsum dolor sit amet, <b>consetetur sadipscing elitr</b>, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <s><b>At vero eos et accusam et justo duo dolores et ea rebum.</b></s> Stet clita kasd gubergren, no sea takimata sanctus est. <u>Lorem ipsum</u> dolor sit amet.',
};
