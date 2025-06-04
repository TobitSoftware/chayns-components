import { Meta, StoryFn } from '@storybook/react';
import { useLanguage } from 'chayns-api';
import React from 'react';
import { AdaptiveTranslation, TranslationOptionsProvider } from '../src';

export default {
    title: 'Translation/AdaptiveTranslation',
    component: AdaptiveTranslation,
    args: {},
} as Meta<typeof AdaptiveTranslation>;

const Template: StoryFn<typeof AdaptiveTranslation> = ({ ...args }) => {
    const language = useLanguage();

    return (
        <TranslationOptionsProvider from={language.site} to={language.active}>
            <AdaptiveTranslation {...args} />
        </TranslationOptionsProvider>
    );
};

export const General = Template.bind({});

General.args = {
    children: 'Hallo',
    from: undefined,
    to: undefined,
};
