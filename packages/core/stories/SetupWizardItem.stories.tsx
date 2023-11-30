import { Meta, StoryFn } from '@storybook/react';
import Input from '../src/components/input/Input';
import RadioButtonGroup from '../src/components/radio-button/radio-button-group/RadioButtonGroup';
import RadioButton from '../src/components/radio-button/RadioButton';
import SetupWizardItem from '../src/components/setup-wizard/setup-wizard-item/SetupWizardItem';

export default {
    title: 'Core/SetupWizardItem',
    component: SetupWizardItem,
    args: {
        step: 1,
        id: 0,
        title: 'Dein Essen',
        shouldEnableButton: true,
        children: (
            <>
                <h3>Teile uns dein Lieblingsessen mit</h3>
                <RadioButtonGroup>
                    <RadioButton id="0" label="Nudeln" />
                    <RadioButton id="1" label="Pizza" />
                    <RadioButton id="2" label="Pommes" />
                    <RadioButton id="3" label="Salat" />
                </RadioButtonGroup>
                <h5>Dein Essen ist nicht dabei? Kein Problem, schreibe es uns einfach.</h5>
                <Input placeholder="Essen eingeben" />
            </>
        ),
    },
} as Meta<typeof SetupWizardItem>;

const Template: StoryFn<typeof SetupWizardItem> = ({ children, ...args }) => (
    <SetupWizardItem {...args}>{children}</SetupWizardItem>
);

export const General = Template.bind({});
