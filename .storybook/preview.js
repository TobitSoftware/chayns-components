import React from 'react';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
    (Story) => (
        <div className="tapp">
            <Story />
        </div>
    ),
];
