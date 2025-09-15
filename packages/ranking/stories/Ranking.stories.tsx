import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Ranking from '../src/components/ranking/Ranking';

export default {
    title: 'Ranking/Ranking',
    component: Ranking,
    args: {},
} as Meta<typeof Ranking>;

const Template: StoryFn<typeof Ranking> = ({ ...args }) => <Ranking {...args} />;

export const General = Template.bind({});

export const Flaschenjagd = Template.bind({});

General.args = {
    entries: [
        {
            rank: 1,
            name: 'Michael Gesenhues',
            personId: 'MIC-HAEL1',
            points: 12,
            content: [
                {
                    id: 'ahdadrh',
                    name: 'Richtiges Ergebnis',
                    value: '3',
                },
                {
                    id: 'haerdjh',
                    name: 'Richtige Tordifferenz',
                    value: '2',
                },
                {
                    id: 'adrhs',
                    name: 'Richtige Tendenz',
                    value: '5',
                },
                {
                    id: 'rhd',
                    headline: 'BONUS',
                },
                {
                    id: 'hdfghm',
                    name: 'Abgegebene Tipps',
                    value: '10',
                },
                {
                    id: 'gjhfd',
                    name: 'Frühe Tippabgabe',
                    value: '458.943 Min.',
                },
            ],
        },
        {
            rank: 2,
            name: 'Jannik Weise',
            personId: 'JAN-NIK96',
            points: 11,
            content: [
                {
                    id: 'ahdadrh',
                    name: 'Richtiges Ergebnis',
                    value: '3',
                },
                {
                    id: 'haerdjh',
                    name: 'Richtige Tordifferenz',
                    value: '2',
                },
                {
                    id: 'adrhs',
                    name: 'Richtige Tendenz',
                    value: '5',
                },
                {
                    id: 'rhd',
                    headline: 'BONUS',
                },
                {
                    id: 'hdfghm',
                    name: 'Abgegebene Tipps',
                    value: '10',
                },
                {
                    id: 'gjhfd',
                    name: 'Frühe Tippabgabe',
                    value: '458.943 Min.',
                },
            ],
        },
    ],
};

Flaschenjagd.args = {
    entries: [
        {
            rank: 1,
            name: 'Michael Gesenhues',
            personId: 'MIC-HAEL1',
            points: 40,
            icons: ['fa fa-jug-bottle'],
        },
        {
            rank: 2,
            name: 'Jannik Weise',
            personId: 'JAN-NIK96',
            points: 38,
            icons: ['fa fa-jug-bottle'],
        },
    ],
};
