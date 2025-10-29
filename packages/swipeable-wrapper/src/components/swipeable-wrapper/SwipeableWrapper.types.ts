import { CSSProperties, ReactNode } from 'react';

export type SwipeableActionItem = {
    action: VoidFunction;
    backgroundColor: CSSProperties['backgroundColor'];
    color: CSSProperties['color'];
    text?: ReactNode;
    icon: ReactNode;
    key: string;
};