import { Meta, StoryFn } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';
import DevalueSlider, {
    DevalueSliderOnDevalueHandler,
    DevalueSliderProps,
} from '../src/components/DevalueSlider';
import { sleep } from '../src/utils/common';

export default {
    title: 'DevalueSlider/DevalueSlider',
    component: DevalueSlider,
    args: {},
    parameters: {
        docs: {
            description: {
                component:
                    'This is a slider component that can be devalued.\n\nFor a normal devalue the user will drag the slider to the right' +
                    ' and release it. It will show a loading cursor and call the onDevalue handler. If the onDevalue handler does not give a' +
                    'successfully response the thumb will snap back to the left. This gives feedback to the user and the person who validates the devalue.\n\n' +
                    'The developer should care about the some additional security measures to prevent fraud. For example this could be an offline detection. ' +
                    'For this you can disable the Slider with the isDisabled prop. This will also cancel the current user drag.',
            },
        },
    },
} as Meta<typeof DevalueSlider>;

const Template: StoryFn<typeof DevalueSlider> = (args: DevalueSliderProps) => {
    return <DevalueSlider {...args} />;
};

//
const LiveUpdateTemplate: StoryFn<typeof DevalueSlider> = (args: DevalueSliderProps) => {
    const [devalueTime, setDevalueTime] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            setDevalueTime(new Date());
            console.log('setting devalue time');
        }, 5000);
    }, []);

    return <DevalueSlider devalueTime={devalueTime} {...args} />;
};

const FailingDevalueTemplate: StoryFn<typeof DevalueSlider> = (args: DevalueSliderProps) => {
    const handleDevalue = useCallback<DevalueSliderOnDevalueHandler>(async () => {
        await sleep(3000);
        return { success: false };
    }, []);

    return <DevalueSlider {...args} onDevalue={handleDevalue} />;
};

const SuccessDevalueTemplate: StoryFn<typeof DevalueSlider> = (args: DevalueSliderProps) => {
    const handleDevalue = useCallback<DevalueSliderOnDevalueHandler>(async () => {
        await sleep(3000);
        return { success: true };
    }, []);

    return <DevalueSlider {...args} onDevalue={handleDevalue} />;
};

export const General = Template.bind({});

/**
 * You can style the slider with the color and devalueColor props.
 */
export const CustomColors = Template.bind({});
CustomColors.args = {
    color: 'blue',
    devalueColor: 'yellow',
};

/**
 * This story shows a devalued slider. It will show a timer.
 */
export const DevaluedSlider = Template.bind({});
DevaluedSlider.args = {
    devalueTime: new Date(Date.now() - 5000),
};

/**
 * This story demonstrates how the devalueTime can be updated with e.g. websockets.
 */
export const LiveUpdate = LiveUpdateTemplate.bind({});

/**
 * In this Story the devalue handler fails. The slider will snap back to the base position.
 * It will give a feedback to the user and the person who validates the devalue.
 */
export const FailingDevalue = FailingDevalueTemplate.bind({});

/**
 * In this Story the devalue handler succeeds. The slider will finish the animation and will the call
 * the onComplete handler.
 */
export const SuccessDevalue = SuccessDevalueTemplate.bind({});
