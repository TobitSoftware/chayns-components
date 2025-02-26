import { Meta, StoryFn } from '@storybook/react';
import PersonFinder from '../src/components/person-finder/PersonFinder';

export default {
    title: 'PersonFinder/PersonFinder',
    component: PersonFinder,
    args: {
        children:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Lorem ipsum dolor sit amet.',
    },
} as Meta<typeof PersonFinder>;

const Template: StoryFn<typeof PersonFinder> = ({ ...args }) => (
    <PersonFinder {...args}/>
);

export const General = Template.bind({});

