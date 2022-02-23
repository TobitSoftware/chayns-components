import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DesignMode, EmojiInput } from '../src/components/EmojiInput';

export default {
    title: 'EmojiInput/EmojiInput',
    component: EmojiInput,
    args: {
        placeholder: 'Platzhalter',
        design: DesignMode.Normal,
        right: <div>AAAAAA</div>,
    },
} as ComponentMeta<typeof EmojiInput>;

const Template: ComponentStory<typeof EmojiInput> = (args) => <EmojiInput {...args} />;

export const General = Template.bind({});
