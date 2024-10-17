import { Meta, StoryFn } from '@storybook/react';
import { useRef } from 'react';
import RadioButtonGroup, {
    type RadioButtonGroupRef,
} from '../src/components/radio-button/radio-button-group/RadioButtonGroup';
import RadioButton from '../src/components/radio-button/RadioButton';
import Button from '../src/components/button/Button';
import Input from '../src/components/input/Input';

export default {
    title: 'Core/RadioButton',
    component: RadioButton,
    args: {
        label: 'Test',
    },
} as Meta<typeof RadioButton>;

const Template: StoryFn<typeof RadioButton> = ({ ...args }) => (
    <RadioButton {...args}></RadioButton>
);

const MultipleRadioButtonsTemplate: StoryFn<typeof RadioButton> = () => {
    const drinksRadioButtonGroupRef = useRef<RadioButtonGroupRef>(null);
    const foodRadioButtonGroupRef = useRef<RadioButtonGroupRef>(null);

    const handleResetDrinksButtonClick = () => {
        drinksRadioButtonGroupRef.current.updateSelectedRadioButtonId(undefined);
    };

    const handleResetFoodButtonClick = () => {
        foodRadioButtonGroupRef.current.updateSelectedRadioButtonId(undefined);
    };

    return (
        <>
            <h1>Speisen</h1>
            <RadioButtonGroup ref={foodRadioButtonGroupRef} selectedId={'2'}>
                <RadioButton id="0" label="Nudeln" />
                <RadioButton id="1" label="Pizza" />
                <RadioButton id="2" label="Pommes" />
                <RadioButton id="3" label="Salat" />
            </RadioButtonGroup>
            <Button onClick={handleResetFoodButtonClick}>Zurücksetzen</Button>
            <h1>Getränke</h1>
            <RadioButtonGroup ref={drinksRadioButtonGroupRef}>
                <RadioButton id="0" label="Wasser" />
                <RadioButton id="1" label="Cola" />
                <RadioButton id="2" label="Fanta" />
                <RadioButton id="3" label="Saft" />
                <RadioButton id="4" label="Milch" />
            </RadioButtonGroup>
            <Button onClick={handleResetDrinksButtonClick}>Zurücksetzen</Button>
        </>
    );
};

const DisabledRadioButtonsTemplate: StoryFn<typeof RadioButton> = () => (
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

const WithChildrenTemplate: StoryFn<typeof RadioButton> = () => (
    <>
        <h1>StarWars Filme</h1>
        <RadioButtonGroup selectedId={'2'}>
            <RadioButton id="0" label="Episode I">
                The Phantom Menace
            </RadioButton>
            <RadioButton id="1" label="Episode II">
                Attack of the Clones
            </RadioButton>
            <RadioButton id="2" label="Episode III">
                Revenge of the Sith
            </RadioButton>
            <RadioButton id="3" label="Episode IV">
                A New Hope
            </RadioButton>
            <RadioButton id="4" label="Episode V">
                The Empire Strikes Back
            </RadioButton>
            <RadioButton id="5" label="Episode VI">
                Return of the Jedi
            </RadioButton>
            <RadioButton id="6" label="Episode VII">
                The Force Awakens
            </RadioButton>
            <RadioButton id="7" label="Episode VIII">
                The Last Jedi
            </RadioButton>
            <RadioButton id="8" label="Episode IX">
                The Rise of Skywalker
            </RadioButton>
        </RadioButtonGroup>
    </>
);

export const General = Template.bind({});

export const WithRightElement = Template.bind({});

export const MultipleRadioButtons = MultipleRadioButtonsTemplate.bind({});

export const DisabledRadioButtons = DisabledRadioButtonsTemplate.bind({});

export const WithChildren = WithChildrenTemplate.bind({});

WithRightElement.args = {
    label: 'Bestellung zum Tisch (Beach)',
    rightElement: <Button onClick={() => {}}>ca. 10 Min</Button>,
    children: (
        <>
            <p style={{ margin: '12px 0' }}>
                Sag uns bitte noch wo Du sitzt. Wir bringen Dir Deine Bestellung dann zum Tisch.
            </p>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ width: '80%' }}>
                    <Input placeholder="Tischnummer" />
                </div>
                <Button onClick={() => {}}>Scannen</Button>
            </div>
        </>
    ),
};
