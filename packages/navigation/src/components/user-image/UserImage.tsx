import React, { FC, useMemo } from 'react';
import { StyledUserImage, StyledUserImageUser } from './userImage.styles';
import { UserImageProps } from './UserImage.types';
import { Popup } from '@chayns-components/core';
import { useUser } from 'chayns-api';

const UserImage: FC<UserImageProps> = ({
    size = 35,
    personId,
    popupContent,
    yOffset = -10,
    onClick,
}) => {
    const user = useUser();

    const src = useMemo(
        () => `https://tsimg.cloud/${personId || user.personId || ''}/profile_w200-h200.png`,
        [personId, user],
    );

    return (
        <StyledUserImage>
            {popupContent ? (
                <Popup content={popupContent} yOffset={yOffset}>
                    <StyledUserImageUser $size={size} src={src} onClick={onClick} />
                </Popup>
            ) : (
                <StyledUserImageUser $size={size} src={src} onClick={onClick} />
            )}
        </StyledUserImage>
    );
};

UserImage.displayName = 'UserImage';

export default UserImage;
