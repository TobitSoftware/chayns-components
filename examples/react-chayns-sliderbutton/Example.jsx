import React from 'react';
import { SliderButton } from '../../src/index';

const SliderButtonExample = () => {
    return (
        <div>
            <div>
                <SliderButton
                    onChange={console.log}
                    onDragStart={() => console.log('DRAG START')}
                    onDragStop={() => console.log('DRAG STOP')}
                    selectedItemId={1}
                />
            </div>
            <div style={{ marginTop: '8px' }}>
                <SliderButton
                    onChange={console.log}
                    onDragStart={() => console.log('DRAG START')}
                    onDragStop={() => console.log('DRAG STOP')}
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
                        {
                            id: 5,
                            text: 'Sa.',
                        },
                        {
                            id: 6,
                            text: 'So.',
                        },
                    ]}
                    selectedItemId={2}
                />
            </div>
            <div style={{ marginTop: '8px' }}>
                <SliderButton
                    onChange={console.log}
                    onDragStart={() => console.log('DRAG START')}
                    onDragStop={() => console.log('DRAG STOP')}
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
                        {
                            id: 5,
                            text: '6',
                        },
                    ]}
                    selectedItemId={4}
                />
            </div>
        </div>
    );
};

export default SliderButtonExample;
