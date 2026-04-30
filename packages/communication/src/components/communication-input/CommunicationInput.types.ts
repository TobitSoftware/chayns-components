import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';
import { ContextMenuItem } from '@chayns-components/core';

export interface CommunicationInputProps {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLDivElement | HTMLTextAreaElement>;
    onFocus?: FocusEventHandler<HTMLDivElement | HTMLTextAreaElement>;

    textType?: CommunicationInputTextType;

    isDisabled?: boolean;

    contextMenuItems?: ContextMenuItem[];

    rightElement?: ReactNode;
    isMultiLine?: boolean;

    chips?: Chip[];
}

export enum CommunicationInputTextType {
    PLAIN = 'PLAIN',
    MARKDOWN = 'MARKDOWN',
}

export interface CommunicationInputRef {
    insertText: (text: string) => void;
    setCursorPosition: (position?: number) => void;
    focus: () => void;
    blur: () => void;
}

export interface Chip {
    label: string;
    icons?: string[];
    onRemove?: () => void;
    onClick?: () => void;
}
