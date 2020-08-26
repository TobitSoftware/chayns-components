import React from 'react';
import { SliderButton } from '../../src/index';

const SliderButtonExample = () => {
    return (
        <div>
            <div>
                <SliderButton
                    onChange={console.log}
                    onDragStart={() => console.log('DRAG START')}
                    onDragStop={(data) => console.log('DRAG STOP', data)}
                    selectedItemId={1}
                />
            </div>
            <div style={{ marginTop: '8px' }}>
                <SliderButton
                    onChange={console.log}
                    onDragStart={() => console.log('DRAG START')}
                    onDragStop={(data) => console.log('DRAG STOP', data)}
                    selectedItemId={1}
                    disabled
                />
            </div>
            <div style={{ marginTop: '8px' }}>
                <SliderButton
                    onChange={console.log}
                    onDragStart={() => console.log('DRAG START')}
                    onDragStop={(data) => console.log('DRAG STOP', data)}
                    items={[
                        {
                            id: 0,
                            text: 'Mo.',
                        },
                        {
                            id: 1,
                            text: 'Di.',
                        },
                        {
                            id: 2,
                            text: 'Mi.',
                        },
                        {
                            id: 3,
                            text: 'Do.',
                        },
                        {
                            id: 4,
                            text: 'Fr.',
                        },
                    ]}
                    selectedItemId={2}
                />
            </div>
            <div style={{ marginTop: '8px' }}>
                <SliderButton
                    onChange={console.log}
                    onDragStart={() => console.log('DRAG START')}
                    onDragStop={(data) => console.log('DRAG STOP', data)}
                    items={[
                        {
                            id: 0,
                            text: '1',
                        },
                        {
                            id: 1,
                            text: '2',
                        },
                        {
                            id: 2,
                            text: '3',
                        },
                        {
                            id: 3,
                            text: '4',
                        },
                        {
                            id: 4,
                            text: '5',
                        },
                    ]}
                    selectedItemId={4}
                />
            </div>
        </div>
    );
};

export default SliderButtonExample;
