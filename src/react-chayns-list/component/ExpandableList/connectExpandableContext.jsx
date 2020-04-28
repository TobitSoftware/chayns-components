import React from 'react';
import ExpandableContext from './ExpandableContext';

export default function connectExpandableContext(WrappedComponent) {
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => (
        <ExpandableContext.Consumer>
            {(context) => (
                <WrappedComponent
                    {...props}
                    open={context && context.open}
                    onOpen={context && context.onOpen}
                    onClose={context && context.onClose}
                    onToggle={context && context.onToggle}
                />
            )}
        </ExpandableContext.Consumer>
    );
}
