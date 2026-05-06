import { ContextMenuItem } from '@chayns-components/core';
import { EmojiInputProps, EmojiInputRef } from '@chayns-components/emoji-input';
import { ReactNode } from 'react';
import { AudioInputProps, AudioInputRef } from '../audio-input/AudioInput.types';

export interface CommunicationInputProps {
    size?: CommunicationInputSize;
    cornerType?: CommunicationInputCornerType;
    chips?: Chip[];
    contextMenuItems?: ContextMenuItem[];
    topContent?: ReactNode;
    rightElement?: ReactNode;
    inputConfig: EmojiInputProps;
    audioInputConfig?: AudioInputProps;
    shouldUseInitialAnimation?: boolean;
    shouldUseAudioInput?: boolean;
}

export interface Chip {
    label: string;
    icons?: string[];
    onRemove?: () => void;
    onClick?: () => void;
}

export interface CommunicationInputRef extends EmojiInputRef, AudioInputRef {
    startAnimation: () => void;
}

export enum CommunicationInputSize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
}

export enum CommunicationInputCornerType {
    DYNAMIC = 'DYNAMIC',
    ROUNDED = 'ROUNDED',
    ROUND = 'ROUND',
}
