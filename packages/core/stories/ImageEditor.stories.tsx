import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ImageEditorAspectRatio } from '../src/components/image-editor/constants/aspectRatio';
import { MaskType } from '../src/components/image-editor/constants/maskType';
import ImageEditor from '../src/components/image-editor/ImageEditor';

export default {
    title: 'Core/ImageEditor',
    component: ImageEditor,
    args: {
        ratio: ImageEditorAspectRatio.ratio_16_9,
        maskType: MaskType.None,
        onConfirm: console.log,
    },
} as ComponentMeta<typeof ImageEditor>;

const Template: ComponentStory<typeof ImageEditor> = (args) => <ImageEditor {...args} />;

export const General = Template.bind({});

General.args = {
    uniqueId: 1,
};
