import { Typewriter } from '@chayns-components/typewriter';
import { Meta, StoryFn } from '@storybook/react';
import Icon from '../src/components/icon/Icon';
import Input from '../src/components/input/Input';

export default {
    title: 'Core/Input',
    component: Input,
    args: {
        placeholder: 'Try me out',
    },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const General = Template.bind({});

export const WithRightElement = Template.bind({});

export const WithDynamicPlaceholders = Template.bind({});

WithRightElement.args = {
    rightElement: (
        <div
            style={{
                backgroundColor: '#3377b6',
                height: '42px',
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

WithDynamicPlaceholders.args = {
    placeholder: (
        <Typewriter
            children={[
                'Erstelle mir einen Bericht über...',
                'Erkläre mir die Photosynthese.',
                'Wie sage ich auf englisch...',
            ]}
            shouldHideCursor
        />
    ),
};
