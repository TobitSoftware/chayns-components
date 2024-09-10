import type { CSSProperties, ReactNode } from 'react';

export interface IListItemRightElement {
    bottom?: ReactNode;
    center?: ReactNode;
    top?: ReactNode;
    topAlignment?: CSSProperties['justifyContent'];
    bottomAlignment?: CSSProperties['justifyContent'];
}

export type IListItemRightElements = IListItemRightElement | ReactNode;
