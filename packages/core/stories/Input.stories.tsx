import { ComponentMeta, ComponentStory } from '@storybook/react';
import Icon from '../src/components/icon/Icon';
import Input from '../src/components/input/Input';

export default {
    title: 'Core/Input',
    component: Input,
    args: {
        placeholder: 'Try me out',
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const General = Template.bind({});

export const WithPlaceholderElement = Template.bind({});

WithPlaceholderElement.args = {
    placeholderElement: <Icon icons={['fa fa-search']} />,
};
