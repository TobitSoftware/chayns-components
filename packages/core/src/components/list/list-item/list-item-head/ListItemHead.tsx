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
import Icon from '../../../icon/Icon';
import ListItemIcon from './list-item-icon/ListItemIcon';
import ListItemImage from './list-item-image/ListItemImage';
import {
    StyledListItemHead,
    StyledListItemHeadBottomRightElement,
    StyledListItemHeadContent,
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
    left?: ReactNode;
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
    left,
}) => {
    const [shouldShowHoverItem, setShouldShowHoverItem] = useState(false);

    const longPressTimeoutRef = useRef<number>();

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
            return <ListItemIcon icons={icons} />;
        }

        if (images) {
            return <ListItemImage images={images} shouldShowRoundImage={!!shouldShowRoundImage} />;
        }

        return undefined;
    }, [icons, images, shouldShowRoundImage]);

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
            {left}
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
