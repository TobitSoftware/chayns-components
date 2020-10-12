import React, { useEffect, useRef, useState } from 'react';
import Bubble from './Bubble';

export default {
    title: 'chayns-components/Bubble',
    component: Bubble,
};

const Template = (args) => {
    const bubbleRef = useRef();

    const [parent] = useState(() => {
        document.body.appendChild(document.createElement('div'));
    });

    useEffect(() => {
        if (bubbleRef.current) {
            bubbleRef.current.show();
        }
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <Bubble {...args} parent={parent} ref={bubbleRef} />
        </div>
    );
};

export const BasicExample = Template.bind({});
BasicExample.args = {
    children: (
        <div style={{ padding: 8 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
            pariatur!
        </div>
    ),
    coordinates: { x: 100, y: 100 },
    position: 3,
};
