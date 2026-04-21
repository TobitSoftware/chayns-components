import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import SplitLayout from '../src/components/split-layout/SplitLayout';
import { SplitLayoutDirection } from '../src';

const meta: Meta<typeof SplitLayout> = {
    title: 'Navigation/SplitLayout',
    component: SplitLayout,
    args: {},
};

export default meta;

const renderTestContent = (content: string) => (
    <div
        style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
        }}
    >
        {content}
    </div>
);

const Template: StoryFn<typeof SplitLayout> = () => {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <SplitLayout
                views={{
                    '1': {
                        component: renderTestContent('1'),
                        minSize: 80,
                        maxSize: 120,
                        collapseBreakpoint: 450,
                    },
                    '2': { component: renderTestContent('2'), minSize: 80, maxSize: 120 },
                    '3': { component: renderTestContent('3') },
                }}
            />
        </div>
    );
};

const VerticalTemplate: StoryFn<typeof SplitLayout> = () => {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <SplitLayout
                direction={SplitLayoutDirection.VERTICAL}
                views={{
                    '1': {
                        component: renderTestContent('1'),
                        minSize: 80,
                        maxSize: 120,
                        collapseBreakpoint: 200,
                    },
                    '2': { component: renderTestContent('2') },
                }}
            />
        </div>
    );
};

export const General = Template.bind({});

export const Vertical = VerticalTemplate.bind({});
