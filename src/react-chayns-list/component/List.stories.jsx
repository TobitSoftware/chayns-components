import React from 'react';
import List from './List';
import ListItem from './ListItem/ListItem';

export default {
    component: ListItem,
    title: 'chayns-components/List',
    decorators: [
        (Story) => (
            <List>
                <Story />
            </List>
        ),
    ],
};

const Template = (args) => (
    <>
        <ListItem {...args} />
        <ListItem {...args} />
    </>
);

export const Basic = Template.bind({});
Basic.args = {
    title: 'This is the title',
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
    ...Basic.args,
    subtitle: 'This is the subtitle',
};

export const WithImage = Template.bind({});
WithImage.args = {
    ...WithSubtitle.args,
    image: 'https://source.unsplash.com/random/90x90',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    ...WithSubtitle.args,
    icon: 'fa fa-paper-plane',
};
