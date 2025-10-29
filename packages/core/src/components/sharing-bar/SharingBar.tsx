import { getSite } from 'chayns-api';
import React, { FC, MouseEventHandler, useCallback, useRef } from 'react';
import { SHAREPROVIDER } from './SharingBar.constants';
import type { ContextMenuAlignment } from '../context-menu/ContextMenu.types';
import { getIsTouch } from '../../utils/environment';
import { copyToClipboard, shareWithApp, shareWithUrl } from '../../utils/sharingBar';
import ContextMenu from '../context-menu/ContextMenu';
import Icon from '../icon/Icon';
import {
    StyledSharingBar,
    StyledSharingBarIconWrapper,
    StyledSharingBarText,
} from './SharingBar.styles';

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

    const handleImageDownload = () => {
        shareWithUrl(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            SHAREPROVIDER[5].url
                .replace('{url}', encodeURIComponent(link))
                .replace('{linkText}', 'Teilen')
                .replace('{color}', getSite().color.replace('#', '')),
        );
    };

    const handleShare = (key: string) => {
        contextMenuRef.current?.hide();

        const isTouch = getIsTouch();

        switch (key) {
            case 'whatsapp':
                shareWithUrl(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    SHAREPROVIDER[0].url.replace('{url}', encodeURIComponent(`${link}`.trim())),
                );
                break;
            case 'facebook':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                shareWithUrl(SHAREPROVIDER[3].url.replace('{url}', encodeURIComponent(link)));
                break;
            case 'twitter':
                shareWithUrl(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    SHAREPROVIDER[4].url
                        .replace('{url}', encodeURIComponent(link))
                        .replace('{linkText}', ''),
                );
                break;
            case 'mail':
                if (isTouch) {
                    shareWithApp(`${link}`.trim());
                } else {
                    shareWithUrl(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        SHAREPROVIDER[2].url.replace('{url}', encodeURIComponent(`${link}`.trim())),
                    );
                }
                break;
            case 'copy':
                copyToClipboard(link);
                break;
            default:
                break;
        }
    };

    const contextMenuItems = [
        {
            icons: ['fa fa-copy'],
            key: 'copy',
            onClick: () => handleShare('copy'),
            text: 'Zwischenablage',
        },
        {
            icons: ['fa-solid fa-brands fa-whatsapp'],
            key: 'whatsapp',
            onClick: () => handleShare('whatsapp'),
            text: 'Whatsapp',
        },
        {
            icons: ['fa-solid fa-brands fa-facebook-f'],
            key: 'facebook',
            onClick: () => handleShare('facebook'),
            text: 'Facebook',
        },
        {
            icons: ['fa-solid fa-brands fa-x-twitter'],
            key: 'twitter',
            onClick: () => handleShare('twitter'),
            text: 'X',
        },
        {
            icons: ['fa fa-envelope'],
            key: 'mail',
            onClick: () => handleShare('mail'),
            text: 'Mail',
        },
        {
            icons: ['fa fa-qrcode'],
            key: 'callingCode',
            onClick: handleImageDownload,
            text: 'Calling Code herunterladen',
        },
    ];

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
            <ContextMenu
                items={contextMenuItems}
                ref={contextMenuRef}
                alignment={popupAlignment}
                container={container}
            >
                {null}
            </ContextMenu>
            <StyledSharingBarText>{label}</StyledSharingBarText>
        </StyledSharingBar>
    );
};

SharingBar.displayName = 'SharingBar';

export default SharingBar;
