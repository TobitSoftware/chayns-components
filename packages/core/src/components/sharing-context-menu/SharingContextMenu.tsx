import { getSite } from 'chayns-api';
import React, { forwardRef, useCallback } from 'react';
import { SHAREPROVIDER } from '../../constants/sharingBar';
import { useIsTouch } from '../../utils/environment';
import { copyToClipboard, shareWithApp, shareWithUrl } from '../../utils/sharingBar';
import ContextMenu from '../context-menu/ContextMenu';
import { ContextMenuProps, ContextMenuRef } from '../context-menu/ContextMenu.types';

export type SharingContextMenuProps = {
    /**
     * The link that should be shared.
     */
    link: string;
} & Omit<ContextMenuProps, 'items'>;

const SharingContextMenu = forwardRef<ContextMenuRef, SharingContextMenuProps>(
    ({ link, children, ...contextMenuProps }, ref) => {
        const isTouch = useIsTouch();

        const handleImageDownload = useCallback(() => {
            shareWithUrl(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                SHAREPROVIDER[5].url
                    .replace('{url}', encodeURIComponent(link))
                    .replace('{linkText}', 'Teilen')
                    .replace('{color}', getSite().color.replace('#', '')),
            );
        }, [link]);

        const handleShare = useCallback(
            (key: string) => {
                switch (key) {
                    case 'whatsapp':
                        shareWithUrl(
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            SHAREPROVIDER[0].url.replace(
                                '{url}',
                                encodeURIComponent(`${link}`.trim()),
                            ),
                        );
                        break;
                    case 'facebook':
                        shareWithUrl(
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            SHAREPROVIDER[3].url.replace('{url}', encodeURIComponent(link)),
                        );
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
                                SHAREPROVIDER[2].url.replace(
                                    '{url}',
                                    encodeURIComponent(`${link}`.trim()),
                                ),
                            );
                        }
                        break;
                    case 'copy':
                        copyToClipboard(link);
                        break;
                    default:
                        break;
                }
            },
            [link, isTouch],
        );

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

        return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ContextMenu items={contextMenuItems} ref={ref} {...contextMenuProps}>
                {children}
            </ContextMenu>
        );
    },
);

SharingContextMenu.displayName = 'SharingContextMenu';

export default SharingContextMenu;
