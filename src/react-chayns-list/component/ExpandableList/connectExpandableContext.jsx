import React from 'react';
import ExpandableContext from './ExpandableContext';

export default function connectExpandableContext(WrappedComponent) {
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
