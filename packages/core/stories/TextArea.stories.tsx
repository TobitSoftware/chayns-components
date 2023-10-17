import { ComponentMeta, ComponentStory } from '@storybook/react';
import TextArea from '../src/components/text-area/TextArea';
import { Typewriter } from '@chayns-components/typewriter/lib';

export default {
    title: 'Core/TextArea',
    component: TextArea,
    args: {
        placeholder: 'Nachricht schreiben',
    },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const General = Template.bind({});

export const MaxHeight = Template.bind({});

export const PlaceholderElement = Template.bind({});

MaxHeight.args = {
    maxHeight: '200px',
};

PlaceholderElement.args = {
    maxHeight: '200px',
    placeholder: (
        <Typewriter
            children={[
                'Hmm, ich würde sagen...',
                'Ich bin mir nicht ganz sicher...',
                'Lass mich kurz nachdenken...',
                'Nochmal von vorne...',
            ]}
        />
    ),
};
