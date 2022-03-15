import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../../core/src/components/button/Button';
import { DesignMode } from '../src/components/emoji-input/constants/design';
import EmojiInput from '../src/components/emoji-input/EmojiInput';

export default {
    title: 'EmojiInput/EmojiInput',
    component: EmojiInput,
    args: {
        placeholder: 'Platzhalter',
    },
} as ComponentMeta<typeof EmojiInput>;

const right = <Button onClick={() => {}}>Senden</Button>;

const Template: ComponentStory<typeof EmojiInput> = (args) => <EmojiInput {...args} />;

export const BorderDesign = Template.bind({});

BorderDesign.args = {
    design: DesignMode.BorderDesign,
};

export const BorderDesignWithRight = Template.bind({});

BorderDesignWithRight.args = {
    right,
    design: DesignMode.BorderDesign,
};
export const BorderDesignDisabled = Template.bind({});

BorderDesignDisabled.args = {
    isDisabled: true,
    design: DesignMode.BorderDesign,
};
export const BorderDesignWithRightDisabled = Template.bind({});

BorderDesignWithRightDisabled.args = {
    isDisabled: true,
    right,
    design: DesignMode.BorderDesign,
};

export const BorderDesignNoEmojiButton = Template.bind({});

BorderDesignNoEmojiButton.args = {
    showEmojiButton: false,
    design: DesignMode.BorderDesign,
};

export const BorderDesignMaxHeight100px = Template.bind({});

BorderDesignMaxHeight100px.args = {
    maxHeight: '100px',
    design: DesignMode.BorderDesign,
};

export const NormalDesign = Template.bind({});

NormalDesign.args = {
    design: DesignMode.Normal,
};

export const NormalDesignWithRight = Template.bind({});

NormalDesignWithRight.args = {
    right,
    design: DesignMode.Normal,
};
export const NormalDesignDisabled = Template.bind({});

NormalDesignDisabled.args = {
    isDisabled: true,
    design: DesignMode.Normal,
};
export const NormalDesignWithRightDisabled = Template.bind({});

NormalDesignWithRightDisabled.args = {
    isDisabled: true,
    right,
    design: DesignMode.Normal,
};

export const NormalDesignNoEmojiButton = Template.bind({});

NormalDesignNoEmojiButton.args = {
    showEmojiButton: false,
    design: DesignMode.Normal,
};
export const NormalDesignMaxHeight100px = Template.bind({});

NormalDesignMaxHeight100px.args = {
    maxHeight: '100px',
    design: DesignMode.Normal,
};

const MultipleEmojiInputsTemplate: ComponentStory<typeof EmojiInput> = (args) => (
    <>
        <EmojiInput
            {...args}
            value={
                'Test&nbsp;Test Text [b style="color:red" a="b"&nbsp;test="test"]BOLT[/b][link]LINK[/link]'
            }
            design={DesignMode.Normal}
        />
        <br />
        <EmojiInput
            {...args}
            value={'Test Text [b]BO[h1]H1 [b]Te[b]st[/b] test[/h1]LT[/b][link]LINK[/link]'}
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
export const MultipleEmojiInputs = MultipleEmojiInputsTemplate.bind({});
