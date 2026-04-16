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
                <SplitLayout.View id="sidebar" defaultSize={100} minSize={50} maxSize={420}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}>
                        Left
                    </div>
                </SplitLayout.View>

                <SplitLayout.View id="content" minSize={240}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'yellow' }}>
                        Center
                    </div>
                </SplitLayout.View>

                <SplitLayout.View id="details" defaultSize={100} minSize={50} maxSize={420}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}>
                        Right
                    </div>
                </SplitLayout.View>
            </SplitLayout>
        </div>
    );
};

const VerticalTemplate: StoryFn<typeof SplitLayout> = () => {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <SplitLayout direction={SplitLayoutDirection.VERTICAL}>
                <SplitLayout.View id="sidebar" defaultSize={160} minSize={120} maxSize={260}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'green' }}>
                        Top
                    </div>
                </SplitLayout.View>

                <SplitLayout.View id="content" minSize={120}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'purple' }}>
                        Bottom
                    </div>
                </SplitLayout.View>
            </SplitLayout>
        </div>
    );
};

export const General = Template.bind({});

export const Vertical = VerticalTemplate.bind({});
