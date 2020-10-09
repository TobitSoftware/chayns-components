import React from 'react';
import { chaynsTheme } from './chaynsTheme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    theme: chaynsTheme,
};

export const decorators = [
    (Story) => (
        <div className="tapp" style={{ margin: 0, padding: 0 }}>
            <Story />
        </div>
    ),
];
