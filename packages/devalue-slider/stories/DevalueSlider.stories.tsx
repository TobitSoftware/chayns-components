import { Meta, StoryFn } from '@storybook/react';
import DevalueSlider from '../src/components/DevalueSlider';

export default {
    title: 'DevalueSlider/DevalueSlider',
    component: DevalueSlider,
    args: {},
} as Meta<typeof DevalueSlider>;

const Template: StoryFn<typeof DevalueSlider> = (children, ...args) => {
    return <DevalueSlider {...args} />;
};

export const General = Template.bind({});
export const WithCustomSecurityColor = Template.bind({});

WithCustomSecurityColor.args = {
    securityColor: 'blue',
};
