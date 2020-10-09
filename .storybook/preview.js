import React from 'react';
import { chaynsTheme } from './chaynsTheme';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    theme: chaynsTheme,
};

export const decorators = [
    (Story) => (
        <div className="tapp">
            <Story />
        </div>
    ),
];
