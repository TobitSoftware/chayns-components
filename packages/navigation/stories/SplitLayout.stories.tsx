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

const Template: StoryFn<typeof SplitLayout> = () => {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <SplitLayout>
                <SplitLayout.View id="sidebar" defaultSize={50} minSize={10} maxSize={100}>
                    <div style={{ width: '100%', height: '100%' }}>Left</div>
                </SplitLayout.View>

                <SplitLayout.View id="content" minSize={10} maxSize={100}>
                    <div style={{ width: '100%', height: '100%' }}>Center</div>
                </SplitLayout.View>

                <SplitLayout.View id="details" defaultSize={50} minSize={10} maxSize={100}>
                    <div style={{ width: '100%', height: '100%' }}>Right</div>
                </SplitLayout.View>
            </SplitLayout>
        </div>
    );
};

const VerticalTemplate: StoryFn<typeof SplitLayout> = () => {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <SplitLayout direction={SplitLayoutDirection.VERTICAL}>
                <SplitLayout.View id="sidebar" defaultSize={60} minSize={20} maxSize={100}>
                    <div style={{ width: '100%', height: '100%' }}>Top</div>
                </SplitLayout.View>

                <SplitLayout.View id="content" minSize={10} maxSize={100}>
                    <div style={{ width: '100%', height: '100%' }}>Bottom</div>
                </SplitLayout.View>
            </SplitLayout>
        </div>
    );
};

export const General = Template.bind({});

export const Vertical = VerticalTemplate.bind({});
