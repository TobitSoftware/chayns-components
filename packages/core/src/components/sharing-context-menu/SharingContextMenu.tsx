import { AppName, getSite, invokeCall, useDevice } from 'chayns-api';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { SHAREPROVIDER } from '../../constants/sharingBar';
import type { SharingBarProvider } from '../../types/sharingBar';
import { useIsTouch } from '../../utils/environment';
import { copyToClipboard, shareWithApp, shareWithUrl } from '../../utils/sharingBar';
import ContextMenu from '../context-menu/ContextMenu';
import { ContextMenuProps, ContextMenuRef } from '../context-menu/ContextMenu.types';

export type SharingContextMenuProps = {
    /**
     * The link that should be shared.
     */
    link: string;
    /**
     * Optional text that is shared together with the link via WhatsApp, mail, and X.
     */
    text?: string;
    /**
     * Shows the action that copies the shared link to the clipboard.
     */
    shouldShowCopyAction?: boolean;
    /**
     * Shows the action that downloads a calling-code image.
     */
    shouldShowCallingCodeAction?: boolean;
    /**
     * Enables keyboard-only focus highlighting for the context menu trigger.
     */
    shouldEnableKeyboardHighlighting?: boolean;
} & Omit<ContextMenuProps, 'items' | 'shouldEnableKeyboardHighlighting'>;

const SharingContextMenu = forwardRef<ContextMenuRef, SharingContextMenuProps>(
    (
        {
            link,
            text,
            children,
            shouldEnableKeyboardHighlighting,
            shouldShowCallingCodeAction = true,
            shouldShowCopyAction = true,
            ...contextMenuProps
        },
        ref,
    ) => {
        const isTouch = useIsTouch();
        const { app, os } = useDevice();

        const shouldUseAppCall = useMemo(
            () =>
                app &&
                app.name === AppName.CityApp &&
                ((os === 'iOS' && app.appVersion >= 7313) ||
                    (os === 'Android OS' && app.appVersion >= 7472)),
            [app, os],
        );

        const shareInApp = useCallback(
            (
                provider: SharingBarProvider | undefined,
                shareText: string,
                callback: VoidFunction,
            ) => {
                if (!provider) {
                    throw new Error('The requested sharing provider is not configured.');
                }

                window.sharingCallback = (retVal: { status: 0 | -1 | -2 }) => {
                    if (retVal.status !== 0) {
                        callback();
                    }
                };

                void invokeCall({
                    action: 80,
                    value: {
                        text: shareText,
                        sharingApp: provider.providerId,
                        ...(provider.androidIdentifier
                            ? { sharingAndroidApp: provider.androidIdentifier }
                            : {}),
                        callback: 'window.sharingCallback',
                    },
                });
            },
            [],
        );

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
                    case 'whatsapp': {
                        const shareText = text ? `${text}\n\n${link}` : `${link}`.trim();
                        const callback = () =>
                            shareWithUrl(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                SHAREPROVIDER[0].url.replace(
                                    '{url}',
                                    encodeURIComponent(shareText),
                                ),
                            );

                        if (shouldUseAppCall) {
                            shareInApp(SHAREPROVIDER[0], shareText, callback);
                            break;
                        }

                        callback();
                        break;
                    }
                    case 'facebook': {
                        const callback = () =>
                            shareWithUrl(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                SHAREPROVIDER[3].url.replace('{url}', encodeURIComponent(link)),
                            );

                        if (shouldUseAppCall) {
                            shareInApp(SHAREPROVIDER[3], `${link}`.trim(), callback);
                            break;
                        }

                        callback();
                        break;
                    }
                    case 'twitter': {
                        const callback = () =>
                            shareWithUrl(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                SHAREPROVIDER[4].url
                                    .replace('{url}', encodeURIComponent(link))
                                    .replace('{linkText}', encodeURIComponent(text ?? '')),
                            );

                        if (shouldUseAppCall) {
                            shareInApp(
                                SHAREPROVIDER[4],
                                text ? `${text}\n\n${link}` : `${link}`.trim(),
                                callback,
                            );
                            break;
                        }

                        callback();
                        break;
                    }
                    case 'mail': {
                        const callback = () =>
                            isTouch
                                ? shareWithApp(text ? `${text}\n\n${link}` : `${link}`.trim())
                                : shareWithUrl(
                                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                      // @ts-ignore
                                      SHAREPROVIDER[2].url.replace(
                                          '{url}',
                                          encodeURIComponent(
                                              text ? `${text}\n\n${link}` : `${link}`.trim(),
                                          ),
                                      ),
                                  );

                        if (shouldUseAppCall) {
                            shareInApp(
                                SHAREPROVIDER[2],
                                text ? `${text}\n\n${link}` : `${link}`.trim(),
                                callback,
                            );
                            break;
                        }

                        callback();
                        break;
                    }
                    case 'copy':
                        copyToClipboard(link);
                        break;
                    default:
                        break;
                }
            },
            [link, text, shouldUseAppCall, shareInApp, isTouch],
        );

        const contextMenuItems = [
            ...(shouldShowCopyAction
                ? [
                      {
                          icons: ['fa fa-copy'],
                          key: 'copy',
                          onClick: () => handleShare('copy'),
                          text: 'Zwischenablage',
                      },
                  ]
                : []),
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
            ...(shouldShowCallingCodeAction
                ? [
                      {
                          icons: ['fa fa-qrcode'],
                          key: 'callingCode',
                          onClick: handleImageDownload,
                          text: 'Calling Code herunterladen',
                      },
                  ]
                : []),
        ];

        return (
            <ContextMenu
                items={contextMenuItems}
                ref={ref}
                shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...contextMenuProps}
            >
                {children}
            </ContextMenu>
        );
    },
);

SharingContextMenu.displayName = 'SharingContextMenu';

export default SharingContextMenu;
