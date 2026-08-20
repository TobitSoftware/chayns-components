import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import Button from '../../core/src/components/button/Button';
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

const MainViewTemplate: StoryFn<typeof SplitLayout> = () => {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <SplitLayout
                mainView="4"
                views={{
                    '1': { component: renderTestContent('1'), minSize: 80, maxSize: 180 },
                    '2': { component: renderTestContent('2'), minSize: 80, maxSize: 180 },
                    '3': { component: renderTestContent('3'), minSize: 80, maxSize: 180 },
                    '4': { component: renderTestContent('4'), minSize: 120 },
                    '5': { component: renderTestContent('5'), minSize: 80, maxSize: 180 },
                }}
            />
        </div>
    );
};

const HiddenViewTemplate: StoryFn<typeof SplitLayout> = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [lastSize, setLastSize] = useState(220);

    return (
        <>
            <Button onClick={() => setIsHidden((prevState) => !prevState)}>
                {isHidden ? 'View einblenden' : 'View ausblenden'}
            </Button>
            <div style={{ width: '100%', height: '400px' }}>
                <SplitLayout
                    onChange={(id, size) => {
                        if (id === '2') {
                            setLastSize(size);
                        }
                    }}
                    views={{
                        '1': { component: renderTestContent('1'), defaultSize: 180 },
                        '2': {
                            component: renderTestContent('2'),
                            defaultSize: lastSize,
                            isHidden,
                        },
                    }}
                />
            </div>
        </>
    );
};

export const General = Template.bind({});

export const MainView = MainViewTemplate.bind({});

export const Vertical = VerticalTemplate.bind({});

export const HiddenView = HiddenViewTemplate.bind({});
