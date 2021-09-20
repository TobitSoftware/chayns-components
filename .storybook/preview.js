import React, { useEffect } from 'react';
import ColorSchemeProvider from '../packages/core/src/components/color-scheme-provider/ColorSchemeProvider';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
        default: 'classic',
        values: [
            { name: 'classic', value: 0 },
            { name: 'dark', value: 1 },
            { name: 'light', value: 2 },
        ],
    },
    controls: {
        expanded: true,
    },
};

export const decorators = [
    (Story, context) => {
        const colorMode = context.globals.backgrounds?.value || 0;

        useEffect(() => {
            if (colorMode === 0) {
                document.body.style.backgroundColor = '#E6EDF5';
            } else if (colorMode === 1) {
                document.body.style.backgroundColor = '#1F262E';
            } else {
                document.body.style.backgroundColor = '#FFFFFF';
            }
        }, [colorMode]);

        return (
            <div className="tapp" style={{ margin: 0, padding: 0 }}>
                <ColorSchemeProvider colorMode={colorMode}>
                    <Story />
                </ColorSchemeProvider>
            </div>
        );
    },
];
