import React, { FC, KeyboardEventHandler, MouseEventHandler, useCallback, useRef } from 'react';
import { useFocusRingPortal } from '../../hooks/useFocusRingPortal';
import { useKeyboardFocusHighlighting } from '../../hooks/useKeyboardFocusHighlighting';
import { useColorScheme } from '../color-scheme-provider/ColorSchemeProvider';
import Icon from '../icon/Icon';
import {
    StyledSharingBar,
    StyledSharingBarIconWrapper,
    StyledSharingBarText,
} from './SharingBar.styles';
import type { ContextMenuAlignment } from '../context-menu/ContextMenu.types';
import SharingContextMenu from '../sharing-context-menu/SharingContextMenu';

export type SharingBarProps = {
    /**
     * The element where the content of the `SharingBar` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * The label that should be displayed.
     */
    label: string;
    /**
     * The link that should be shared.
     */
    link: string;
    /**
     * The alignment of the sharing options.
     */
    popupAlignment: ContextMenuAlignment;
    /**
     * Enables keyboard-only focus highlighting and keyboard interaction.
     */
    shouldEnableKeyboardHighlighting?: boolean;
};

const SharingBar: FC<SharingBarProps> = ({
    label,
    link,
    popupAlignment,
    container,
    shouldEnableKeyboardHighlighting,
}) => {
    const colorScheme = useColorScheme();
    const shouldEnableKeyboardHighlightingEffective =
        shouldEnableKeyboardHighlighting ?? colorScheme?.shouldEnableKeyboardHighlighting ?? false;

    const contextMenuRef = useRef<{ hide: VoidFunction; show: VoidFunction }>(null);
    const sharingBarRef = useRef<HTMLDivElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlightingEffective,
    );
    useFocusRingPortal(sharingBarRef, { isEnabled: shouldShowKeyboardHighlighting });

    const showContextMenu = useCallback(() => {
        contextMenuRef.current?.show();
    }, []);

    const handleSharingBarClick = useCallback<MouseEventHandler<HTMLDivElement>>(
        (event) => {
            event.preventDefault();
            event.stopPropagation();

            showContextMenu();
        },
        [showContextMenu],
    );

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            if (event.currentTarget !== event.target) {
                return;
            }

            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            showContextMenu();
        },
        [showContextMenu],
    );

    return (
        <StyledSharingBar
            ref={sharingBarRef}
            onClick={handleSharingBarClick}
            onKeyDown={shouldEnableKeyboardHighlightingEffective ? handleKeyDown : undefined}
            tabIndex={shouldEnableKeyboardHighlightingEffective ? 0 : undefined}
            role={shouldEnableKeyboardHighlightingEffective ? 'button' : undefined}
            data-should-show-keyboard-highlighting={
                shouldShowKeyboardHighlighting ? 'true' : undefined
            }
        >
            <StyledSharingBarIconWrapper>
                <Icon icons={['fa fa-share-nodes']} />
            </StyledSharingBarIconWrapper>
            <SharingContextMenu
                link={link}
                ref={contextMenuRef}
                alignment={popupAlignment}
                container={container}
                shouldDisableClick
            >
                {null}
            </SharingContextMenu>
            <StyledSharingBarText>{label}</StyledSharingBarText>
        </StyledSharingBar>
    );
};

SharingBar.displayName = 'SharingBar';

export default SharingBar;
