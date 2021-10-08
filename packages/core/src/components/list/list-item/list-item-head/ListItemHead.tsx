import React, { FC, MouseEventHandler, ReactNode, useCallback, useMemo, useState } from 'react';
import GridImage from '../../../grid-image/GridImage';
import Icon from '../../../icon/Icon';
import {
    StyledListItemHead,
    StyledListItemHeadContent,
    StyledListItemHeadIcon,
    StyledListItemHeadImage,
    StyledListItemHeadImageWrapper,
    StyledListItemHeadSubtitle,
    StyledListItemHeadTitle,
    StyledMotionListItemHeadIndicator,
} from './ListItemHead.styles';

type ListItemHeadProps = {
    icons?: [string, ...string[]];
    images?: string[];
    isAnyItemExpandable: boolean;
    isExpandable: boolean;
    isOpen: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    rightElements?: [ReactNode, ...ReactNode[]];
    subtitle?: ReactNode;
    shouldShowRoundImage?: boolean;
    title: ReactNode;
};

const ListItemHead: FC<ListItemHeadProps> = ({
    icons,
    images,
    isAnyItemExpandable,
    isExpandable,
    isOpen,
    onClick,
    rightElements,
    subtitle,
    shouldShowRoundImage,
    title,
}) => {
    const [hasLoadedImage, setHasLoadedImage] = useState(false);

    const handleImageLoaded = useCallback(() => {
        setHasLoadedImage(true);
    }, []);

    const iconOrImageElement = useMemo(() => {
        if (icons) {
            return (
                <StyledListItemHeadIcon>
                    <Icon icons={icons} size={22} />
                </StyledListItemHeadIcon>
            );
        }

        if (images && images[0] && images[1] && images[2]) {
            const gridImages: [string, string, string] = [images[0], images[1], images[2]];

            return (
                <GridImage
                    images={gridImages}
                    shouldShowRoundImage={shouldShowRoundImage}
                    size={40}
                />
            );
        }

        if (images && images[0]) {
            return (
                <StyledListItemHeadImageWrapper shouldShowRoundImage={shouldShowRoundImage}>
                    <StyledListItemHeadImage
                        isHidden={!hasLoadedImage}
                        onLoad={handleImageLoaded}
                        src={images[0]}
                    />
                </StyledListItemHeadImageWrapper>
            );
        }

        return undefined;
    }, [handleImageLoaded, hasLoadedImage, icons, images, shouldShowRoundImage]);

    return (
        <StyledListItemHead
            className="beta-chayns-list-item-head"
            isClickable={typeof onClick === 'function' || isExpandable}
            onClick={onClick}
        >
            {isAnyItemExpandable && (
                <StyledMotionListItemHeadIndicator
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    initial={false}
                >
                    {isExpandable && <Icon icons={['fa fa-chevron-right']} />}
                </StyledMotionListItemHeadIndicator>
            )}
            {iconOrImageElement}
            <StyledListItemHeadContent isIconOrImageGiven={iconOrImageElement !== undefined}>
                <StyledListItemHeadTitle className="ellipsis">{title}</StyledListItemHeadTitle>
                {subtitle && (
                    <StyledListItemHeadSubtitle className="ellipsis">
                        {subtitle}
                    </StyledListItemHeadSubtitle>
                )}
            </StyledListItemHeadContent>
        </StyledListItemHead>
    );
};

ListItemHead.displayName = 'ListItemHead';

export default ListItemHead;
