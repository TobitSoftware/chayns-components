import React, { FC, MouseEventHandler, useCallback, useRef } from 'react';
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
};

const SharingBar: FC<SharingBarProps> = ({ label, link, popupAlignment, container }) => {
    const contextMenuRef = useRef<{ hide: VoidFunction; show: VoidFunction }>(null);

    const handleSharingBarClick = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        event.preventDefault();
        event.stopPropagation();

        contextMenuRef.current?.show();
    }, []);

    return (
        <StyledSharingBar onClick={handleSharingBarClick}>
            <StyledSharingBarIconWrapper>
                <Icon icons={['fa-solid fa-share-nodes']} />
            </StyledSharingBarIconWrapper>
            <SharingContextMenu
                link={link}
                ref={contextMenuRef}
                alignment={popupAlignment}
                container={container}
            >
                {null}
            </SharingContextMenu>
            <StyledSharingBarText>{label}</StyledSharingBarText>
        </StyledSharingBar>
    );
};

SharingBar.displayName = 'SharingBar';

export default SharingBar;
