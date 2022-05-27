import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ImageEditorAspectRatio } from '../src/components/constants/aspectRatio';
import { MaskType } from '../src/components/constants/maskType';
import ImageEditor, { ImageEditorUserMode } from '../src/components/ImageEditor';

export default {
    title: 'ImageEditor/ImageEditor',
    component: ImageEditor,
    args: {
        imageUrl:
            'https://tsimg.cloud/77890-29730/ef1214d1d3e6f4bf5045f23085ff14a508f1a682_fwebp-w1000.jpg',
        maskType: MaskType.None,
        onConfirm: console.log,
        userMode: ImageEditorUserMode.admin,
    },
} as ComponentMeta<typeof ImageEditor>;

const Template: ComponentStory<typeof ImageEditor> = (args) => <ImageEditor {...args} />;

export const AdminMode = Template.bind({});

AdminMode.args = {
    uId: 1,
};
export const UserMode = Template.bind({});

UserMode.args = {
    uId: 2,
    userMode: ImageEditorUserMode.user,
};

export const NoImage = Template.bind({});

NoImage.args = {
    uId: 3,
    imageUrl: '',
    ratio: ImageEditorAspectRatio.ratio_4_3,
};
