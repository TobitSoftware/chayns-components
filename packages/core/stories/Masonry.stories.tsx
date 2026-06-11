import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import Masonry from '../src/components/masonry/Masonry';

export default {
    title: 'Core/Masonry',
    component: Masonry,
    args: {
        gap: 16,
        minColumnWidth: 220,
    },
} as Meta<typeof Masonry>;

const heights = [120, 200, 160, 320, 180, 240, 140, 260, 190, 280, 150, 220];

const Card = styled.div<{ $height: number }>`
    height: ${({ $height }) => $height}px;
    border-radius: 12px;
    background: linear-gradient(135deg, #4f8cff, #6cc7ff);
    color: white;
    padding: 16px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    font-weight: bold;
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
`;

const Template: StoryFn<typeof Masonry> = (args) => (
    <Wrapper>
        <Masonry {...args}>
            {heights.map((height, index) => (
                <Card key={index} $height={height}>
                    {index + 1}
                </Card>
            ))}
        </Masonry>
    </Wrapper>
);

const DynamicTemplate: StoryFn<typeof Masonry> = (args) => {
    const [count, setCount] = React.useState(8);

    return (
        <Wrapper>
            <button style={{ marginBottom: 20 }} onClick={() => setCount((c) => c + 1)}>
                Add Card
            </button>

            <Masonry {...args}>
                {Array.from({ length: count }).map((_, index) => (
                    <Card key={index} $height={120 + Math.random() * 220}>
                        {index + 1}
                    </Card>
                ))}
            </Masonry>
        </Wrapper>
    );
};

export const General = Template.bind({});

export const Dynamic = DynamicTemplate.bind({});
