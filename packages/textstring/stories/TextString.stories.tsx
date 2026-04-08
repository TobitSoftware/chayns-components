import { RadioButton, RadioButtonGroup } from '@chayns-components/core';
import { Meta, StoryFn } from '@storybook/react';
import React, { useCallback, useMemo, useState } from 'react';
import { Textstring, TextstringProvider } from '../src';

export default {
    title: 'Textstring/Textstring',
    component: Textstring,
    args: {},
} as Meta<typeof Textstring>;

const Template: StoryFn<typeof Textstring> = ({ ...args }) => (
    <TextstringProvider language="de" libraryName="chayns.components">
        <Textstring {...args} />
    </TextstringProvider>
);

const TextstringWithReplacementTemplate: StoryFn<typeof Textstring> = ({ ...args }) => {
    const [food, setFood] = useState('##food##');

    const handleFoodChange = useCallback((id?: string) => {
        switch (id) {
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
    }, []);

    return useMemo(() => {
        return (
            <TextstringProvider language="de" libraryName="chayns.components">
                <Textstring
                    childrenTagName="h1"
                    textstring={{
                        fallback: '##food## ist lecker.',
                        name: 'txt_chayns_chaynsComponents_textString_example_replacement',
                    }}
                    replacements={{ '##food##': food }}
                />
                <i>'##food##' wird durch die ausgewählte Speise ersetzt</i>
                <h2>Speise auswählen</h2>
                <RadioButtonGroup onSelect={handleFoodChange}>
                    <RadioButton id="0" label="Eis" />
                    <RadioButton id="1" label="Pizza" />
                    <RadioButton id="2" label="Schokolade" />
                    <RadioButton id="3" label="Salat" />
                </RadioButtonGroup>
            </TextstringProvider>
        );
    }, [food, handleFoodChange]);
};

export const General = Template.bind({});

export const WithHTML = Template.bind({});

export const TextstringWithReplacement = TextstringWithReplacementTemplate.bind({});

export const TextstringWithStyles = Template.bind({});

WithHTML.args = {
    textstring: {
        fallback: '<button>Drücke mich!</button>',
        name: 'txt_chayns_chaynsComponents_textString_example_with_html',
    },
    isTextstringHTML: true,
};

General.args = {
    childrenTagName: 'h1',
    textstring: {
        fallback: 'Das ist ein Textstring! Pizza ist lecker.',
        name: 'txt_chayns_chaynsComponents_textString_example',
    },
};

TextstringWithStyles.args = {
    childrenTagName: 'h1',
    childrenStyles: { color: 'rebeccapurple' },
    textstring: {
        fallback: 'Das ist ein Textstring! Pizza ist lecker.',
        name: 'txt_chayns_chaynsComponents_textString_example',
    },
};
