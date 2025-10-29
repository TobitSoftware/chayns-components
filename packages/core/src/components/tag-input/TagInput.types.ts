import { ReactNode } from 'react';

export interface Tag {
    id: string;
    text: string;
    rightElement?: ReactNode;
}
