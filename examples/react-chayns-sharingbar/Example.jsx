import React from 'react';
import { SharingBar } from '../../src/index';

export default function SharingBarExample() {
    return [
        <div style={{ height: '200px' }} />,
        <SharingBar stopPropagation />,
    ];
}
