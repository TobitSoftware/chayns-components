import React, {
    ComponentType,
    forwardRef,
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    RefAttributes,
} from 'react';

export const LIST_ITEM_MARKER = Symbol('ListItem');

export interface ListItemMetaProps {
    // eslint-disable-next-line react/no-unused-prop-types
    isExpandable?: boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    shouldHideIndicator?: boolean;
}

export type ListItemMarkedComponent<P> = ComponentType<P & ListItemMetaProps> & {
    $$listItem: typeof LIST_ITEM_MARKER;
};

export type ListItemMarkedForwardRefComponent<P, R> = ForwardRefExoticComponent<
    P & ListItemMetaProps & RefAttributes<R>
> & {
    $$listItem: typeof LIST_ITEM_MARKER;
};

type DisplayNameComponent = {
    displayName?: string;
    name?: string;
};

const getDisplayName = (Component: DisplayNameComponent): string =>
    Component.displayName || Component.name || 'Component';

export const withListItemMarker = <P,>(
    Component: ComponentType<P & ListItemMetaProps>,
): ListItemMarkedComponent<P> => {
    const WrappedComponent = ((props: P & ListItemMetaProps) => {
        const { isExpandable = false, shouldHideIndicator = false, ...restProps } = props;

        return (
            <Component
                {...(restProps as P)}
                isExpandable={isExpandable}
                shouldHideIndicator={shouldHideIndicator}
            />
        );
    }) as ListItemMarkedComponent<P>;

    WrappedComponent.$$listItem = LIST_ITEM_MARKER;
    WrappedComponent.displayName = `withListItemMarker(${getDisplayName(Component)})`;

    return WrappedComponent;
};

export const withListItemMarkerForwardRef = <P, R>(
    render: ForwardRefRenderFunction<R, P & ListItemMetaProps>,
    displayName: string,
): ListItemMarkedForwardRefComponent<P, R> => {
    const Component = forwardRef<R, P & ListItemMetaProps>((props, ref) => {
        const { isExpandable = true, shouldHideIndicator = false, ...restProps } = props;

        return render(
            {
                ...(restProps as P),
                isExpandable,
                shouldHideIndicator,
            },
            ref,
        );
    }) as ListItemMarkedForwardRefComponent<P, R>;

    Component.$$listItem = LIST_ITEM_MARKER;
    Component.displayName = displayName;

    return Component;
};
