import React from 'react';
import ColorScheme from './ColorScheme';

export default {
    title: 'chayns-components/ColorScheme',
    component: ColorScheme,
};

const Template = (args) => {
    window.chayns = { env: { site: { color: '#005EB8' } } };

    return <ColorScheme {...args} />;
};

export const BasicExample = Template.bind({});
BasicExample.args = {
    children: (
        <div className="chayns__color--205">
            This text was styled with chayns&apos; color classes.
        </div>
    ),
    color: '#22aa22',
    colorMode: 2,
};
