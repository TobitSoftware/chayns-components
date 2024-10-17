import React, { Children, ReactNode } from 'react';

export const getRadioButtonOrder = (children: ReactNode): string[] => {
    const radioButtonIds: string[] = [];

    Children.forEach(children, (child) => {
        if (React.isValidElement<{ id?: string }>(child)) {
            const { id } = child.props;

            if (typeof id === 'string') {
                radioButtonIds.push(id);
            }
        }
    });

    return radioButtonIds;
};
