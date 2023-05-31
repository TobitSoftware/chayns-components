import Input from '@chayns-components/core/lib/components/input/Input';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RadioButtonGroup from '../../core/src/components/radio-button/radio-button-group/RadioButtonGroup';
import RadioButton from '../../core/src/components/radio-button/RadioButton';
import SetupWizardItem from '../src/components/setup-wizard-item/SetupWizardItem';
import SetupWizard from '../src/components/setup-wizard/SetupWizard';

export default {
    title: 'SetupWizard/SetupWizard',
    component: SetupWizard,
    args: {},
} as ComponentMeta<typeof SetupWizard>;

const Template: ComponentStory<typeof SetupWizard> = ({ ...args }) => (
    <SetupWizard {...args}>
        <SetupWizardItem step={1} title="Intro" shouldEnableButton>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et dui eget sapien
            convallis tincidunt. Sed dictum vestibulum mi, quis euismod nunc suscipit vitae. Aenean
            quis nisi eu purus efficitur ullamcorper sed vitae est. Duis quis diam non orci
            facilisis mattis at a justo. Nam tempor lacinia nisl id sagittis. Nunc ultricies ex
            eros, ac lobortis nulla lobortis vel. Integer volutpat sem sem, id aliquam magna viverra
            nec. In tempus neque quis urna facilisis, vel pulvinar sapien pretium. Vivamus
            condimentum dignissim massa eu posuere. Sed rutrum, enim vel ullamcorper lobortis,
            libero turpis ultrices metus, in sodales lectus dui et lorem. Donec tincidunt arcu diam,
            et maximus nibh convallis sit amet. Aenean tristique et felis at dignissim. Nam a
            interdum risus, sit amet vestibulum turpis. Integer dolor risus, sodales a faucibus eu,
            iaculis dignissim augue.
        </SetupWizardItem>
        <SetupWizardItem step={2} title="Dein Name" shouldEnableButton>
            <h3>Teile uns deinen Namen mit</h3>
            <Input placeholder="Namen eingeben" />
        </SetupWizardItem>
        <SetupWizardItem step={3} title="Dein Essen" shouldEnableButton>
            <h3>Teile uns dein Lieblingsessen mit</h3>
            <RadioButtonGroup>
                <RadioButton id="0" label="Nudeln" />
                <RadioButton id="1" label="Pizza" />
                <RadioButton id="2" label="Pommes" />
                <RadioButton id="3" label="Salat" />
            </RadioButtonGroup>
            <h5>Dein Essen ist nicht dabei? Kein Problem, schreibe es uns einfach.</h5>
            <Input placeholder="Essen eingeben" />
        </SetupWizardItem>
        <SetupWizardItem step={4} title="Fertig" shouldEnableButton isLastItem>
            <h3>Danke für deine Zeit :)</h3>
        </SetupWizardItem>
    </SetupWizard>
);

export const General = Template.bind({});
