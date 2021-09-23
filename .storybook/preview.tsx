import { BaseSyntheticEvent, useEffect } from 'react';
import ColorSchemeProvider from '../packages/core/src/components/color-scheme-provider/ColorSchemeProvider';
import { action as brokenAction } from '@storybook/addon-actions';

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

        // region fix SyntheticEvents of react
        // This could be removed when the issue https://github.com/storybookjs/storybook/issues/6471 is fixed
        const action: typeof brokenAction = (name, options) => {
            const constructedAction = brokenAction(name, options);

            return (...args: (BaseSyntheticEvent | any)[]) => {
                const fixedArgs = args.map((arg) => {
                    if (!arg || !('type' in arg)) {
                        return arg;
                    }

                    return {
                        type: arg.type,
                        shiftKey: arg.shiftKey,
                        screenX: arg.screenX,
                        screenY: arg.screenY,
                        pageX: arg.pageX,
                        pageY: arg.pageY,
                        metaKey: arg.metaKey,
                        movementX: arg.movementX,
                        movementY: arg.movementY,
                        clientX: arg.clientX,
                        clientY: arg.clientY,
                        ctrlKey: arg.ctrlKey,
                        altKey: arg.altKey,
                    };
                });

                return constructedAction(...fixedArgs);
            };
        };

        if (context.parameters.actions.argTypesRegex) {
            const regex = new RegExp(context.parameters.actions.argTypesRegex);

            Object.keys(context.args).forEach((key) => {
                if (!key.match(regex)) {
                    return;
                }

                context.args[key] = action(key);
            });
        }
        // endregion

        return (
            <div className="tapp" style={{ margin: 0, padding: 0 }}>
                <ColorSchemeProvider colorMode={colorMode}>
                    <Story />
                </ColorSchemeProvider>
            </div>
        );
    },
];
