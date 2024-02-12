import { Meta, StoryFn } from '@storybook/react';
import TextArea from '../src/components/text-area/TextArea';
import { ChangeEvent, useState } from 'react';

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

export const MaxHeight = Template.bind({});

MaxHeight.args = {
    maxHeight: '200px',
};
