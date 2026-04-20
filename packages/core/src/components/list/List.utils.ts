import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import { LIST_ITEM_MARKER } from './list-item/ListItem.utils';

export interface ListItemMetaProps {
    isExpandable?: boolean;
    shouldHideIndicator?: boolean;
    children?: ReactNode;
}

type ListItemMarkedType = {
    $$listItem?: typeof LIST_ITEM_MARKER;
};

export const isDirectListItemElement = (node: ReactNode): node is ReactElement<ListItemMetaProps> =>
    isValidElement(node) && (node.type as { displayName?: string }).displayName === 'ListItem';

export const isMarkedListItemElement = (node: ReactNode): node is ReactElement<ListItemMetaProps> =>
    isValidElement(node) &&
    typeof node.type !== 'string' &&
    (node.type as ListItemMarkedType).$$listItem === LIST_ITEM_MARKER;

export const shouldShowExpandIndicator = (node: ReactNode): boolean =>
    Children.toArray(node).some((child) => {
        if (isDirectListItemElement(child)) {
            return (
                child.props.isExpandable !== false &&
                child.props.shouldHideIndicator !== true &&
                child.props.children !== undefined
            );
        }

        if (isMarkedListItemElement(child)) {
            return child.props.isExpandable !== false && child.props.shouldHideIndicator !== true;
        }

        if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
            return shouldShowExpandIndicator(child.props.children);
        }

        return false;
    });
