import React, { useState } from 'react';
import ColorPicker from './ColorPicker';

export default {
    title: 'chayns-components/ColorPicker',
    component: ColorPicker,
};

const Template = (args) => {
    const [color, setColor] = useState('#FFFFFF');

    const [parent] = useState(() => {
        document.body.appendChild(document.createElement('div'));
    });

    return (
        <ColorPicker
            {...args}
            color={color}
            onChange={setColor}
            parent={parent}
        />
    );
};

export const Inline = Template.bind({});
Inline.args = {
    transparency: true,
    style: {
        marginBottom: '30px',
        marginTop: '20px',
    },
    inline: true,
};
