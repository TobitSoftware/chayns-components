import { action as brokenAction, HandlerFunction } from '@storybook/addon-actions';
import { ChaynsProvider } from 'chayns-api';
import { BaseSyntheticEvent, useEffect } from 'react';
import PageProvider from '../packages/core/src/components/page-provider/PageProvider';
import React from 'react';

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
    // @ts-ignore
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

        document.body.style.height = '100vh';

        // region fix SyntheticEvents of React
        // This could be removed when the issue https://github.com/storybookjs/storybook/issues/6471 is fixed
        const action: typeof brokenAction = (name, options) => {
            const constructedAction = brokenAction(name, options);

            return (...args: (BaseSyntheticEvent | any)[]) => {
                const fixedArgs = args.map((arg) => {
                    if (!arg || typeof arg !== 'object' || !('type' in arg)) {
                        return arg;
                    }

                    return {
                        altKey: arg.altKey,
                        clientX: arg.clientX,
                        clientY: arg.clientY,
                        ctrlKey: arg.ctrlKey,
                        innerText: arg.type === 'input' ? arg.target.innerText : undefined,
                        metaKey: arg.metaKey,
                        movementX: arg.movementX,
                        movementY: arg.movementY,
                        pageX: arg.pageX,
                        pageY: arg.pageY,
                        screenX: arg.screenX,
                        screenY: arg.screenY,
                        shiftKey: arg.shiftKey,
                        type: arg.type,
                        value: arg.type === 'change' ? arg.target.value : undefined,
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
            <div style={{ maxWidth: '556px', height: '100%' }}>
                <ChaynsProvider>
                    <PageProvider colorMode={colorMode} shouldRemovePadding>
                        <Story />
                    </PageProvider>
                </ChaynsProvider>
            </div>
        );
    },
];
