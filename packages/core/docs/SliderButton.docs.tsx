import React, { FC } from 'react';
import { SliderButton, SliderButtonItem } from '@chayns-components/core';

const ITEMS: SliderButtonItem[] = [
    { id: 'montag', text: 'Mo.' },
    { id: 'dienstag', text: 'Di.' },
    { id: 'mittwoch', text: 'Mi.' },
    { id: 'donnerstag', text: 'Do.' },
    { id: 'freitag', text: 'Fr.' },
    { id: 'samstag', text: 'Sa.' },
    { id: 'sonntag', text: 'So.' },
];

const Component: FC = () => {
    return <SliderButton items={ITEMS} />;
};

Component.displayName = 'Component';

export default Component;
