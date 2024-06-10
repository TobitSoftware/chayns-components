import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import Button from '../src/components/button/Button';
import ExpandableContent from '../src/components/expandable-content/ExpandableContent';

export default {
    title: 'Core/ExpandableContent',
    component: ExpandableContent,
    args: {
        id: 'test',
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nisi vel nulla tincidunt facilisis. Nullam fringilla eu felis at sollicitudin. Aliquam et urna augue. Praesent rhoncus hendrerit molestie. Vestibulum non faucibus mauris. In bibendum ultricies pulvinar. Duis in nisi lacinia, maximus dolor sit amet, pharetra neque. Quisque vulputate semper eleifend. Quisque imperdiet dolor faucibus, lobortis quam et, consectetur dui. Nunc at aliquam odio, vel luctus magna. Cras at ante at nunc volutpat aliquam. Integer ex nunc, pellentesque ac pharetra eu, porttitor eu mi.\n' +
            '\n' +
            'Vestibulum mollis sagittis maximus. Nulla facilisi. Curabitur accumsan ipsum laoreet ipsum rutrum, id vehicula lectus cursus. Donec sit amet eros sed quam suscipit sodales. Phasellus faucibus fermentum sagittis. Vestibulum non orci quis nisl aliquet pharetra. Donec massa dui, consectetur sit amet metus ac, mattis semper nulla. Suspendisse ut quam a enim egestas gravida at sed sapien. Duis id mi id nisl pellentesque ornare quis non nibh. Fusce pellentesque, leo interdum rutrum maximus, libero purus auctor velit, at sodales nulla elit ut est. Nam tellus lacus, tristique et nulla sed, mollis vulputate mi. Donec tempor non magna id ornare. Integer facilisis lacus urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc nec leo in nulla faucibus facilisis at nec dolor.',
    },
} as Meta<typeof ExpandableContent>;

const Template: StoryFn<typeof ExpandableContent> = ({ children, ...args }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen((prevState) => !prevState)}>öffnen/schließen</Button>
            <ExpandableContent
                {...args}
                animate={isOpen ? { opacity: 1, height: '100%' } : { opacity: 0, height: 0 }}
            >
                {children}
            </ExpandableContent>
        </>
    );
};

export const General = Template.bind({});
