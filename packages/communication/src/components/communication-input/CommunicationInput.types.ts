import { ContextMenuItem } from '@chayns-components/core';
import { EmojiInputProps } from '@chayns-components/emoji-input';
import { ReactNode } from 'react';

export interface CommunicationInputProps extends EmojiInputProps {
    contextMenuItems?: ContextMenuItem[];
    content?: ReactNode;
    chips?: Chip[];
}

export interface Chip {
    label: string;
    icons?: string[];
    onRemove?: () => void;
    onClick?: () => void;
}
