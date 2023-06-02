import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useMemo, useState } from 'react';
import RadioButtonGroup from '../src/components/radio-button/radio-button-group/RadioButtonGroup';
import RadioButton from '../src/components/radio-button/RadioButton';
import { RadioButtonItem } from '../src/components/radio-button/types';
import TextStringProvider from '../src/components/textstring-provider/TextStringProvider';
import TextString from '../src/components/textstring/TextString';

export default {
    title: 'Core/TextString',
    component: TextString,
    args: {},
} as ComponentMeta<typeof TextString>;

const Template: ComponentStory<typeof TextString> = ({ ...args }) => (
    <TextStringProvider language="de" libraryName="chayns.components">
        <TextString {...args} />
    </TextStringProvider>
);

const TextStringWithReplacementTemplate: ComponentStory<typeof TextString> = ({ ...args }) => {
    const [food, setFood] = useState('##food##');
    const handleFoodChange = (item: RadioButtonItem) => {
        switch (item.id) {
            case '0':
                setFood('Eis');
                break;
            case '1':
                setFood('Pizza');
                break;
            case '3':
                setFood('Salat');
                break;
            default:
                setFood('Schokolade');
                break;
        }
    };

    return useMemo(() => {
        return (
            <TextStringProvider language="de" libraryName="chayns.components">
                <TextString
                    childrenTagName="h1"
                    textString={{
                        fallback: '##food## ist lecker.',
                        name: 'txt_chayns_chaynsComponents_textString_example_replacement',
                    }}
                    replacements={[{ key: '##food##', replacement: food }]}
                />
                <i>'##food##' wird durch die ausgewählte Speise ersetzt</i>
                <h2>Speise auswählen</h2>
                <RadioButtonGroup onChange={handleFoodChange}>
                    <RadioButton id="0" label="Eis" />
                    <RadioButton id="1" label="Pizza" />
                    <RadioButton id="2" label="Schokolade" />
                    <RadioButton id="3" label="Salat" />
                </RadioButtonGroup>
            </TextStringProvider>
        );
    }, [food]);
};

export const General = Template.bind({});

export const TextStringWithReplacement = TextStringWithReplacementTemplate.bind({});

General.args = {
    childrenTagName: 'h1',
    textString: {
        fallback: 'Das ist ein TextString! Pizza ist lecker.',
        name: 'txt_chayns_chaynsComponents_textString_example',
    },
};
