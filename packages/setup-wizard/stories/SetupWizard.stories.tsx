import Button from '@chayns-components/core/lib/components/button/Button';
import Input from '@chayns-components/core/lib/components/input/Input';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useRef } from 'react';
import RadioButtonGroup from '../../core/src/components/radio-button/radio-button-group/RadioButtonGroup';
import RadioButton from '../../core/src/components/radio-button/RadioButton';
import SetupWizardItem from '../src/components/setup-wizard-item/SetupWizardItem';
import SetupWizard, { SetupWizardRef } from '../src/components/setup-wizard/SetupWizard';

export default {
    title: 'SetupWizard/SetupWizard',
    component: SetupWizard,
    args: {},
} as ComponentMeta<typeof SetupWizard>;

const Template: ComponentStory<typeof SetupWizard> = ({ ...args }) => {
    const setupRef = useRef<SetupWizardRef>();

    return (
        <SetupWizard {...args} ref={setupRef}>
            <SetupWizardItem id={0} step={1} title="Intro">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et dui eget sapien
                convallis tincidunt. Sed dictum vestibulum mi, quis euismod nunc suscipit vitae.
                Aenean quis nisi eu purus efficitur ullamcorper sed vitae est. Duis quis diam non
                orci facilisis mattis at a justo. Nam tempor lacinia nisl id sagittis. Nunc
                ultricies ex eros, ac lobortis nulla lobortis vel. Integer volutpat sem sem, id
                aliquam magna viverra nec. In tempus neque quis urna facilisis, vel pulvinar sapien
                pretium. Vivamus condimentum dignissim massa eu posuere. Sed rutrum, enim vel
                ullamcorper lobortis, libero turpis ultrices metus, in sodales lectus dui et lorem.
                Donec tincidunt arcu diam, et maximus nibh convallis sit amet. Aenean tristique et
                felis at dignissim. Nam a interdum risus, sit amet vestibulum turpis. Integer dolor
                risus, sodales a faucibus eu, iaculis dignissim augue.
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <Button
                        onClick={() => {
                            setupRef.current.next();
                        }}
                    >
                        Weiter
                    </Button>
                </div>
            </SetupWizardItem>
            <SetupWizardItem id={1} step={2} title="Dein Name">
                <h3>Teile uns deinen Namen mit</h3>
                <Input placeholder="Namen eingeben" />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <Button
                        onClick={() => {
                            setupRef.current.next();
                        }}
                    >
                        Weiter
                    </Button>
                </div>
            </SetupWizardItem>
            <SetupWizardItem id={2} step={3} title="Dein Essen">
                <h3>Teile uns dein Lieblingsessen mit</h3>
                <RadioButtonGroup>
                    <RadioButton id="0" label="Nudeln" />
                    <RadioButton id="1" label="Pizza" />
                    <RadioButton id="2" label="Pommes" />
                    <RadioButton id="3" label="Salat" />
                </RadioButtonGroup>
                <h5>Dein Essen ist nicht dabei? Kein Problem, schreibe es uns einfach.</h5>
                <Input placeholder="Essen eingeben" />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <Button
                        onClick={() => {
                            setupRef.current.next();
                        }}
                    >
                        Weiter
                    </Button>
                </div>
            </SetupWizardItem>
            <SetupWizardItem id={3} step={4} title="Fertig">
                <h3>Danke für deine Zeit :)</h3>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <Button
                        onClick={() => {
                            setupRef.current.reset();
                        }}
                    >
                        Neu
                    </Button>
                </div>
            </SetupWizardItem>
        </SetupWizard>
    );
};

export const General = Template.bind({});
