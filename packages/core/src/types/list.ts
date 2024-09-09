import type { ReactNode } from 'react';

export interface IListItemRightElement {
    bottom?: ReactNode;
    center?: ReactNode;
    top?: ReactNode;
}

export type IListItemRightElements = IListItemRightElement | ReactNode;
