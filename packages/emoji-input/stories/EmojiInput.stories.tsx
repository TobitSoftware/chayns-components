import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DesignMode } from '../src/components/emoji-input/constants/design';
import EmojiInput from '../src/components/emoji-input/EmojiInput';

export default {
    title: 'EmojiInput/EmojiInput',
    component: EmojiInput,
    args: {
        placeholder: 'Platzhalter',
        right: <div>AAAAAA</div>,
    },
} as ComponentMeta<typeof EmojiInput>;

const Template: ComponentStory<typeof EmojiInput> = (args) => <EmojiInput {...args} />;

export const NormalDesign = Template.bind({});

NormalDesign.args = {
    design: DesignMode.Normal,
};
export const BorderDesign = Template.bind({});

BorderDesign.args = {
    design: DesignMode.BorderDesign,
};

const TestTemplate: ComponentStory<typeof EmojiInput> = (args) => (
    <>
        <EmojiInput {...args} value={'Test Text [b]BOLT[/b]'} design={DesignMode.Normal} />
        <br />
        <EmojiInput
            {...args}
            value={'Test Text <strong>BOLT</strong>'}
            design={DesignMode.Normal}
            right={null}
        />
        <br />
        <EmojiInput {...args} design={DesignMode.Normal} right={null} showEmojiButton={false} />
        <br />
        <EmojiInput {...args} design={DesignMode.Normal} isDisabled />
        <br />
        <EmojiInput {...args} value={'AAAAAAAAA'} design={DesignMode.Normal} isDisabled />
        <br />
        <EmojiInput {...args} design={DesignMode.BorderDesign} />
        <br />
        <EmojiInput {...args} design={DesignMode.BorderDesign} right={null} />
        <br />
        <EmojiInput
            {...args}
            design={DesignMode.BorderDesign}
            right={null}
            showEmojiButton={false}
        />
        <br />
        <EmojiInput {...args} design={DesignMode.BorderDesign} isDisabled />
        <br />
        <EmojiInput {...args} value={'AAAAAAAAA'} design={DesignMode.BorderDesign} isDisabled />
    </>
);
export const TestDesign = TestTemplate.bind({});
