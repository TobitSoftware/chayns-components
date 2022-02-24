import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DesignMode } from '../src/components/emoji-input/constants/design';
import EmojiInput from '../src/components/emoji-input/EmojiInput';

export default {
    title: 'EmojiInput/EmojiInput',
    component: EmojiInput,
    args: {
        placeholder: 'Placeholder',
    },
} as ComponentMeta<typeof EmojiInput>;

const Template: ComponentStory<typeof EmojiInput> = (args) => <EmojiInput {...args} />;

export const NormalDesign = Template.bind({});

export const BorderDesign = Template.bind({});

NormalDesign.args = {
    design: DesignMode.Normal,
};

BorderDesign.args = {
    design: DesignMode.BorderDesign,
};
