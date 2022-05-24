import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ImageEditorAspectRatio } from '../src/components/constants/aspectRatio';
import { MaskType } from '../src/components/constants/maskType';
import ImageEditor, { ImageEditorUserMode } from '../src/components/ImageEditor';

export default {
    title: 'ImageEditor/ImageEditor',
    component: ImageEditor,
    args: {
        ratio: ImageEditorAspectRatio.ratio_16_9,
        maskType: MaskType.None,
        onConfirm: console.log,
    },
} as ComponentMeta<typeof ImageEditor>;

const Template: ComponentStory<typeof ImageEditor> = (args) => <ImageEditor {...args} />;

export const General = Template.bind({});

export const NoImage = Template.bind({});

General.args = {
    uId: 11111111,
    imageUrl:
        'https://tsimg.cloud/77890-29730/ef1214d1d3e6f4bf5045f23085ff14a508f1a682_fwebp-w1000.jpg',
    userMode: ImageEditorUserMode.user,
};

NoImage.args = {
    uId: '222222',
    imageUrl: '',
    ratio: ImageEditorAspectRatio.ratio_4_3,
    userMode: ImageEditorUserMode.admin,
};
