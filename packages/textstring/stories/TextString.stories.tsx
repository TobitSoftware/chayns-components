import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useMemo, useState } from 'react';
import RadioButtonGroup from '@chayns-components/core/lib/components/radio-button/radio-button-group/RadioButtonGroup';
import RadioButton from '@chayns-components/core/lib/components/radio-button/RadioButton';
import { RadioButtonItem } from '@chayns-components/core/lib/components/radio-button/types';
import { TextString, TextStringProvider } from '../src';

export default {
    title: 'TextString/TextString',
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

export const TextStringWithStyles = Template.bind({});

General.args = {
    childrenTagName: 'h1',
    textString: {
        fallback: 'Das ist ein TextString! Pizza ist lecker.',
        name: 'txt_chayns_chaynsComponents_textString_example',
    },
};

TextStringWithStyles.args = {
    childrenTagName: 'h1',
    childrenStyles: { color: 'rebeccapurple' },
    textString: {
        fallback: 'Das ist ein TextString! Pizza ist lecker.',
        name: 'txt_chayns_chaynsComponents_textString_example',
    },
};
