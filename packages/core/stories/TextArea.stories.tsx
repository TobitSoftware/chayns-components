import { Meta, StoryFn } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import Icon from '../src/components/icon/Icon';
import TextArea from '../src/components/text-area/TextArea';

export default {
    title: 'Core/TextArea',
    component: TextArea,
    args: {
        placeholder: 'Nachricht schreiben',
    },
} as Meta<typeof TextArea>;

const Template: StoryFn<typeof TextArea> = (args) => {
    const [value, setValue] = useState<string>(args.value);

    const handleChange = (event: ChangeEvent) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return <TextArea {...args} onChange={handleChange} value={value} />;
};

export const General = Template.bind({});

export const Disabled = Template.bind({});

export const MaxHeight = Template.bind({});

export const RightElement = Template.bind({});

Disabled.args = {
    isDisabled: true,
};

MaxHeight.args = {
    maxHeight: '200px',
};

RightElement.args = {
    rightElement: (
        <div
            style={{
                backgroundColor: '#3377b6',
                height: '100%',
                width: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon icons={['ts-calling-code']} size={25} color={'white'} />
        </div>
    ),
};
