import { ComponentMeta, ComponentStory } from '@storybook/react';
import SetupWizardItem from '../src/components/setup-wizard-item/SetupWizardItem';
import SetupWizard from '../src/components/SetupWizard';

export default {
    title: 'SetupWizard/SetupWizard',
    component: SetupWizard,
    args: {},
} as ComponentMeta<typeof SetupWizard>;

const Template: ComponentStory<typeof SetupWizard> = ({ ...args }) => (
    <SetupWizard {...args}>
        <SetupWizardItem>Test1</SetupWizardItem>
        <SetupWizardItem>Test2</SetupWizardItem>
        <SetupWizardItem>Test3</SetupWizardItem>
        <SetupWizardItem>Test4</SetupWizardItem>
        <SetupWizardItem>Test5</SetupWizardItem>
    </SetupWizard>
);

export const General = Template.bind({});
