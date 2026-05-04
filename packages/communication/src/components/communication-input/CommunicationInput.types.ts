import { ContextMenuItem } from '@chayns-components/core';
import { EmojiInputProps, EmojiInputRef } from '@chayns-components/emoji-input';
import { ReactNode } from 'react';

export interface CommunicationInputProps extends EmojiInputProps {
    contextMenuItems?: ContextMenuItem[];
    content?: ReactNode;
    chips?: Chip[];
    shouldUseInitialAnimation?: boolean;
    cornerType?: CornerType;
    size?: Size;
}

export interface Chip {
    label: string;
    icons?: string[];
    onRemove?: () => void;
    onClick?: () => void;
}

export interface CommunicationInputRef extends EmojiInputRef {
    startAnimation: () => void;
}

export enum Size {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
}

export enum CornerType {
    DYNAMIC = 'DYNAMIC',
    ROUNDED = 'ROUNDED',
}
