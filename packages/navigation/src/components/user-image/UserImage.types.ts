import { ReactNode } from 'react';

export interface UserImageProps {
    personId?: string;
    size?: number;
    yOffset?: number;
    popupContent?: ReactNode;
    onClick?: () => void;
}
