import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';
import DevalueSlider, {
    DevalueSliderProps,
    OnDevalueHandlerResult,
} from '../src/components/DevalueSlider';
import { sleep } from '../src/utils/common';

export default {
    title: 'DevalueSlider/DevalueSlider',
    component: DevalueSlider,
    args: {},
} as Meta<typeof DevalueSlider>;

const Template: StoryFn<typeof DevalueSlider> = (args: DevalueSliderProps) => {
    return <DevalueSlider {...args} />;
};

const LiveUpdateTemplate: StoryFn<typeof DevalueSlider> = (args: DevalueSliderProps) => {
    const [devalueTime, setDevalueTime] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            setDevalueTime(new Date());
        }, 5000);
    }, []);

    return <DevalueSlider devalueTime={devalueTime} {...args} />;
};

export const General = Template.bind({});

export const WithColors = Template.bind({});
WithColors.args = {
    color: 'blue',
    devalueColor: 'yellow',
};

export const WithDevalueTime = Template.bind({});
WithDevalueTime.args = {
    devalueTime: new Date(Date.now() - 5000),
};

export const LiveUpdate = LiveUpdateTemplate.bind({});

export const WithFailingDevalue = Template.bind({});
WithFailingDevalue.args = {
    onDevalue: async (): Promise<OnDevalueHandlerResult> => {
        await sleep(3000);
        return { success: false };
    },
};
