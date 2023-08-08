import { Input } from '@chayns-components/core';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RadioButtonGroup from '../../core/src/components/radio-button/radio-button-group/RadioButtonGroup';
import RadioButton from '../../core/src/components/radio-button/RadioButton';
import SetupWizardItem from '../src/components/setup-wizard-item/SetupWizardItem';

export default {
    title: 'SetupWizard/SetupWizardItem',
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
} as ComponentMeta<typeof SetupWizardItem>;

const Template: ComponentStory<typeof SetupWizardItem> = ({ children, ...args }) => (
    <SetupWizardItem {...args}>{children}</SetupWizardItem>
);

export const General = Template.bind({});
