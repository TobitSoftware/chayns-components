import React, {
    FC,
    MouseEventHandler,
    ReactNode,
    TouchEventHandler,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import GridImage from '../../../grid-image/GridImage';
import Icon from '../../../icon/Icon';
import {
    StyledListItemHead,
    StyledListItemHeadBottomRightElement,
    StyledListItemHeadContent,
    StyledListItemHeadIcon,
    StyledListItemHeadImage,
    StyledListItemHeadImageWrapper,
    StyledListItemHeadRightElement,
    StyledListItemHeadSubtitle,
    StyledListItemHeadSubtitleText,
    StyledListItemHeadTitle,
    StyledListItemHeadTitleText,
    StyledListItemHeadTopRightElement,
    StyledMotionListItemHeadHoverItem,
    StyledMotionListItemHeadIndicator,
} from './ListItemHead.styles';

type ListItemHeadProps = {
    hoverItem?: ReactNode;
    icons?: string[];
    images?: string[];
    isAnyItemExpandable: boolean;
    isExpandable: boolean;
    isOpen: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onLongPress?: TouchEventHandler<HTMLDivElement>;
    rightElements?: [ReactNode, ...ReactNode[]];
    subtitle?: ReactNode;
    shouldShowRoundImage?: boolean;
    title: ReactNode;
};

const ListItemHead: FC<ListItemHeadProps> = ({
    hoverItem,
    icons,
    images,
    isAnyItemExpandable,
    isExpandable,
    isOpen,
    onClick,
    onLongPress,
    rightElements,
    subtitle,
    shouldShowRoundImage,
    title,
}) => {
    const [hasLoadedImage, setHasLoadedImage] = useState(false);
    const [shouldShowHoverItem, setShouldShowHoverItem] = useState(false);

    const longPressTimeoutRef = useRef<number>();

    const handleImageLoaded = useCallback(() => {
        setHasLoadedImage(true);
    }, []);

    const handleMouseEnter = useCallback(() => setShouldShowHoverItem(true), []);

    const handleMouseLeave = useCallback(() => setShouldShowHoverItem(false), []);

    const handleTouchStart = useCallback<TouchEventHandler<HTMLDivElement>>(
        (event) => {
            longPressTimeoutRef.current = window.setTimeout(() => {
                if (typeof onLongPress === 'function') {
                    onLongPress(event);
                }
            }, 400);
        },
        [onLongPress]
    );

    const handleTouchEnd = useCallback(() => {
        clearTimeout(longPressTimeoutRef.current);
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
            const gridImages = [images[0], images[1], images[2]];

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={typeof onLongPress === 'function' ? handleTouchStart : undefined}
            onTouchEnd={typeof onLongPress === 'function' ? handleTouchEnd : undefined}
        >
            {isAnyItemExpandable && (
                <StyledMotionListItemHeadIndicator
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    initial={false}
                    transition={{ type: 'tween' }}
                >
                    {isExpandable && <Icon icons={['fa fa-chevron-right']} />}
                </StyledMotionListItemHeadIndicator>
            )}
            {iconOrImageElement}
            <StyledListItemHeadContent
                isIconOrImageGiven={iconOrImageElement !== undefined}
                isOpen={isOpen}
            >
                <StyledListItemHeadTitle>
                    <StyledListItemHeadTitleText className="ellipsis">
                        {title}
                    </StyledListItemHeadTitleText>
                    {rightElements && rightElements.length > 1 && rightElements[0] && (
                        <StyledListItemHeadTopRightElement>
                            {rightElements[0]}
                        </StyledListItemHeadTopRightElement>
                    )}
                </StyledListItemHeadTitle>
                {subtitle && (
                    <StyledListItemHeadSubtitle>
                        <StyledListItemHeadSubtitleText className="ellipsis">
                            {subtitle}
                        </StyledListItemHeadSubtitleText>
                        {rightElements && rightElements.length > 1 && rightElements[1] && (
                            <StyledListItemHeadBottomRightElement>
                                {rightElements[1]}
                            </StyledListItemHeadBottomRightElement>
                        )}
                    </StyledListItemHeadSubtitle>
                )}
            </StyledListItemHeadContent>
            {rightElements?.length === 1 && (
                <StyledListItemHeadRightElement>{rightElements[0]}</StyledListItemHeadRightElement>
            )}
            {hoverItem && (
                <StyledMotionListItemHeadHoverItem
                    animate={{
                        marginLeft: shouldShowHoverItem ? 8 : 0,
                        opacity: shouldShowHoverItem ? 1 : 0,
                        width: shouldShowHoverItem ? 'auto' : 0,
                    }}
                    initial={false}
                    transition={{ duration: 0.15, type: 'tween' }}
                >
                    {hoverItem}
                </StyledMotionListItemHeadHoverItem>
            )}
        </StyledListItemHead>
    );
};

ListItemHead.displayName = 'ListItemHead';

export default ListItemHead;
