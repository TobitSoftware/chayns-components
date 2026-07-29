import React, { Children, ReactNode } from 'react';

export const getRadioButtonOrder = (children: ReactNode): (string | number)[] => {
    const radioButtonIds: (string | number)[] = [];

    Children.forEach(children, (child) => {
        if (React.isValidElement<{ id?: string | number }>(child)) {
            const { id } = child.props;

            if (typeof id === 'string' || typeof id === 'number') {
                radioButtonIds.push(id);
            }
        }
    });

    return radioButtonIds;
};
