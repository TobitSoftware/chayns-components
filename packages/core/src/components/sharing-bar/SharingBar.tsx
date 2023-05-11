import React, { FC, useRef } from 'react';
import { ContextMenuAlignment } from '../context-menu/constants/alignment';
import ContextMenu from '../context-menu/ContextMenu';
import Icon from '../icon/Icon';
import {
    StyledSharingBar,
    StyledSharingBarIconWrapper,
    StyledSharingBarText,
} from './SharingBar.styles';

export type SharingBarProps = {
    /**
     * The link that should be shared.
     */
    link: string;
};

const SharingBar: FC<SharingBarProps> = ({ link }) => {
    const contextMenuRef = useRef<{ hide: VoidFunction; show: VoidFunction }>(null);

    const handleImageDownload = async () => {
        const image = await fetch(
            `https://cube.tobit.cloud/qr-code-generator/v1.0/png?value=${link}&color=005EB8&text=Teilen`
        );
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);

        const url = document.createElement('a');

        // Removes illegal characters from the name and shortens it to a maximum of 50 characters
        const fileName = `CallingCode_Share`
            .replace(/[^\w-]+/g, '_')
            .trim()
            .slice(0, 75);

        url.href = imageURL;
        url.download = fileName;

        document.body.appendChild(url);

        url.click();

        document.body.removeChild(url);
    };

    const handleShare = (key: string) => {
        const encodedUrl = encodeURIComponent(link);
        let preparedLink;

        switch (key) {
            case 'whatsapp':
                preparedLink = `https://wa.me/?text=${encodedUrl}`;
                break;
            case 'facebook':
                preparedLink = `https://www.facebook.com/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                preparedLink = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
                break;
            case 'mail':
                preparedLink = `mailto:?subject=&body= ${encodedUrl}`;
                break;
            case 'copy':
                void navigator.clipboard.writeText(link);
                break;
            default:
                break;
        }

        if (!preparedLink) {
            return;
        }

        window.open(preparedLink);
    };

    const contextMenuItems = [
        {
            icons: ['fa fa-copy'],
            key: 'copy',
            onClick: () => handleShare('copy'),
            text: 'Zwischenablage',
        },
        {
            icons: ['fa-brands fa-whatsapp'],
            key: 'whatsapp',
            onClick: () => handleShare('whatsapp'),
            text: 'Whatsapp',
        },
        {
            icons: ['fa-brands fa-facebook-f'],
            key: 'facebook',
            onClick: () => handleShare('facebook'),
            text: 'Facebook',
        },
        {
            icons: ['fa-brands fa-twitter'],
            key: 'twitter',
            onClick: () => handleShare('twitter'),
            text: 'Twitter',
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

    const handleSharingBarClick = () => {
        contextMenuRef.current?.show();
    };

    return (
        <StyledSharingBar onClick={handleSharingBarClick}>
            <StyledSharingBarIconWrapper>
                <Icon icons={['fa fa-share-nodes']} />
            </StyledSharingBarIconWrapper>
            <ContextMenu
                items={contextMenuItems}
                ref={contextMenuRef}
                // ToDo change alignment
                alignment={ContextMenuAlignment.BottomRight}
            >
                {null}
            </ContextMenu>
            <StyledSharingBarText>Teilen</StyledSharingBarText>
        </StyledSharingBar>
    );
};

SharingBar.displayName = 'SharingBar';

export default SharingBar;
