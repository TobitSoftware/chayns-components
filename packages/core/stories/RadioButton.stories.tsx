import { ComponentMeta, ComponentStory } from '@storybook/react';
import RadioButtonGroup from '../src/components/radio-button/radio-button-group/RadioButtonGroup';
import RadioButton from '../src/components/radio-button/RadioButton';

export default {
    title: 'Core/RadioButton',
    component: RadioButton,
    args: {
        label: 'Test',
    },
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = ({ ...args }) => (
    <RadioButton {...args}></RadioButton>
);

const MultipleRadioButtonsTemplate: ComponentStory<typeof RadioButton> = () => (
    <>
        <h1>Speisen</h1>
        <RadioButtonGroup>
            <RadioButton id="0" label="Nudeln" />
            <RadioButton id="1" label="Pizza" />
            <RadioButton id="2" label="Pommes" />
            <RadioButton id="3" label="Salat" />
        </RadioButtonGroup>
        <h1>Getränke</h1>
        <RadioButtonGroup>
            <RadioButton id="0" label="Wasser" />
            <RadioButton id="1" label="Cola" />
            <RadioButton id="2" label="Fanta" />
            <RadioButton id="3" label="Saft" />
            <RadioButton id="4" label="Milch" />
        </RadioButtonGroup>
    </>
);

const DisabledRadioButtonsTemplate: ComponentStory<typeof RadioButton> = () => (
    <>
        <h1>Bester StarWars Film?</h1>
        <RadioButtonGroup>
            <RadioButton id="0" label="Episode I – The Phantom Menace" />
            <RadioButton id="1" label="Episode II – Attack of the Clones" />
            <RadioButton id="2" label="Episode III – Revenge of the Sith" />
            <RadioButton id="3" label="Episode IV – A New Hope" />
            <RadioButton id="4" label="Episode V – The Empire Strikes Back" />
            <RadioButton id="5" label="Episode VI – Return of the Jedi" />
            <RadioButton id="6" label="Episode VII – The Force Awakens" isDisabled />
            <RadioButton id="7" label="Episode VIII – The Last Jedi" isDisabled />
            <RadioButton id="8" label="Episode IX – The Rise of Skywalker" isDisabled />
        </RadioButtonGroup>
    </>
);

export const General = Template.bind({});

export const MultipleRadioButtons = MultipleRadioButtonsTemplate.bind({});

export const DisabledRadioButtons = DisabledRadioButtonsTemplate.bind({});
