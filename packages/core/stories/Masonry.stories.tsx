import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import Masonry from '../src/components/masonry/Masonry';

export default {
    title: 'Core/Masonry',
    component: Masonry,
    args: {
        gap: 16,
        columnWidth: 160,
        rowHeight: 80,
    },
} as Meta<typeof Masonry>;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
`;

const Actions = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 8px 12px;
    cursor: pointer;
`;

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

const Tile = styled.div<{ $height: number }>`
    height: ${({ $height }) => $height}px;
    border-radius: 12px;
    background: #1f2937;
    color: white;
    padding: 16px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 22px;
    font-weight: 700;
`;

const masonryItems = [
    { id: '1', height: 120, columns: 1 },
    { id: '2', height: 200, columns: 1 },
    { id: '3', height: 160, columns: 1 },
    { id: '4', height: 120, columns: 2 },
    { id: '5', height: 180, columns: 1 },
    { id: '6', height: 240, columns: 1 },
    { id: '7', height: 140, columns: 1 },
    { id: '8', height: 260, columns: 2 },
    { id: '9', height: 190, columns: 1 },
    { id: '10', height: 280, columns: 1 },
    { id: '11', height: 150, columns: 2 },
    { id: '12', height: 220, columns: 1 },
];

const Template: StoryFn<typeof Masonry> = (args) => (
    <Wrapper>
        <Masonry {...args}>
            {masonryItems.map((item) => (
                <Masonry.Item key={item.id} columns={item.columns}>
                    <Card $height={item.height}>{item.id}</Card>
                </Masonry.Item>
            ))}
        </Masonry>
    </Wrapper>
);

export const General = Template.bind({});

const PackedTemplate: StoryFn<typeof Masonry> = (args) => (
    <Wrapper>
        <Masonry {...args}>
            <Masonry.Item>
                <Tile $height={80}>1</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={80}>2</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={80}>3</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={80}>4</Tile>
            </Masonry.Item>

            <Masonry.Item columns={2}>
                <Tile $height={80}>5</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={80}>6</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={80}>7</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={80}>8</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={176}>9</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={80}>10</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={176}>11</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={80}>12</Tile>
            </Masonry.Item>

            <Masonry.Item>
                <Tile $height={80}>13</Tile>
            </Masonry.Item>
        </Masonry>
    </Wrapper>
);

export const Packed = PackedTemplate.bind({});

const createItem = (index: number) => ({
    id: crypto.randomUUID(),
    label: index + 1,
    height: 80 + Math.round(Math.random() * 220),
    columns: Math.random() > 0.75 ? 2 : 1,
});

const DynamicTemplate: StoryFn<typeof Masonry> = (args) => {
    const [items, setItems] = React.useState(() =>
        Array.from({ length: 10 }).map((_, index) => createItem(index)),
    );

    return (
        <Wrapper>
            <Actions>
                <Button
                    onClick={() =>
                        setItems((currentItems) => [
                            ...currentItems,
                            createItem(currentItems.length),
                        ])
                    }
                >
                    Add Card
                </Button>

                <Button onClick={() => setItems((currentItems) => currentItems.slice(0, -1))}>
                    Remove Card
                </Button>

                <Button
                    onClick={() =>
                        setItems((currentItems) =>
                            [...currentItems].sort(() => Math.random() - 0.5),
                        )
                    }
                >
                    Shuffle
                </Button>
            </Actions>

            <Masonry {...args}>
                {items.map((item) => (
                    <Masonry.Item key={item.id} columns={item.columns}>
                        <Card $height={item.height}>{item.label}</Card>
                    </Masonry.Item>
                ))}
            </Masonry>
        </Wrapper>
    );
};

export const Dynamic = DynamicTemplate.bind({});
