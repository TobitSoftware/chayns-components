import React, { useState } from 'react';
import Icon from '../../react-chayns-icon/component/Icon';
import ContextMenu from './ContextMenu';

export default {
    title: 'chayns-components/ContextMenu',
    component: ContextMenu,
};

const Template = (args) => {
    const [parent] = useState(() => {
        document.body.appendChild(document.createElement('div'));
    });

    return <ContextMenu {...args} parent={parent} />;
};

export const BasicExample = Template.bind({});
BasicExample.args = {
    children: <Icon icon="ts-ellipsis_v" />,
    items: [
        {
            className: null,
            onClick: console.log,
            text: 'Coffee',
            icon: 'fa fa-coffee',
        },
        {
            className: null,
            onClick: console.log,
            text: 'Tobit',
            icon: 'ts-tobit',
        },
    ],
    disableDialog: true,
};
