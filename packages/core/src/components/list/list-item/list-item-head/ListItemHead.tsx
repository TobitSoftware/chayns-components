import { LayoutGroup, motion } from 'motion/react';
import React, {
    CSSProperties,
    FC,
    MouseEventHandler,
    ReactNode,
    SyntheticEvent,
    TouchEventHandler,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { IListItemRightElements } from '../../../../types/list';
import Icon from '../../../icon/Icon';
import ListItemIcon from './list-item-icon/ListItemIcon';
import ListItemImage from './list-item-image/ListItemImage';
import {
    StyledListItemHeadContent,
    StyledListItemHeadLeftWrapper,
    StyledListItemHeadSubtitle,
    StyledMotionListItemHeadHoverItem,
    StyledMotionListItemHeadHoverItemWrapper,
    StyledListItemHead,
    StyledListItemHeadIndicator,
    StyledListItemHeadTitle,
} from './ListItemHead.styles';
import {
    LIST_ITEM_HEAD_HTML_TAG,
    LIST_ITEM_HEAD_INDICATOR_HTML_TAG,
    LIST_ITEM_HEAD_TITLE_HTML_TAG,
} from '../../../../constants/list';
import ListItemTitle from './list-item-title/ListItemTitle';
import ListItemSubtitle from './list-item-subtitle/ListItemSubtitle';
import ListItemRightElement from './list-item-right-element/ListItemRightElement';

type ListItemHeadProps = {
    careOfLocationId?: number;
    cornerImage?: string;
    hoverItem?: ReactNode;
    icons?: string[];
    imageBackground?: CSSProperties['background'];
    images?: string[];
    isAnyItemExpandable: boolean;
    isExpandable: boolean;
    isOpen: boolean;
    isTitleGreyed?: boolean;
    leftElements?: ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onLongPress?: TouchEventHandler<HTMLDivElement>;
    rightElements?: IListItemRightElements;
    shouldHideImageOrIconBackground?: boolean;
    shouldHideIndicator?: boolean;
    shouldOpenImageOnClick: boolean;
    shouldShowRoundImageOrIcon?: boolean;
    subtitle?: ReactNode;
    title: ReactNode;
    titleElement?: ReactNode;
    shouldForceHover?: boolean;
    setShouldEnableTooltip: (value: boolean) => void;
    shouldDisableAnimation?: boolean;
    cornerElement?: ReactNode;
    onImageError?: (event: SyntheticEvent<HTMLImageElement, Event>, index: number) => void;
};

const ListItemHead: FC<ListItemHeadProps> = ({
    careOfLocationId,
    cornerImage,
    hoverItem,
    icons,
    imageBackground,
    images,
    isAnyItemExpandable,
    isExpandable,
    isOpen,
    isTitleGreyed,
    leftElements,
    onClick,
    onLongPress,
    rightElements,
    shouldHideImageOrIconBackground,
    shouldHideIndicator,
    shouldOpenImageOnClick,
    shouldShowRoundImageOrIcon,
    subtitle,
    shouldForceHover,
    title,
    titleElement,
    setShouldEnableTooltip,
    shouldDisableAnimation = false,
    cornerElement,
    onImageError,
}) => {
    const [shouldShowHoverItem, setShouldShowHoverItem] = useState(false);

    const longPressTimeoutRef = useRef<number>();

    const shouldShowSubtitleRow =
        subtitle ||
        typeof subtitle === 'string' ||
        (typeof rightElements === 'object' && rightElements && 'bottom' in rightElements);

    const shouldShowMultilineTitle = useMemo(() => !subtitle, [subtitle]);

    const handleShowTooltipResize = useCallback(
        (entries: ResizeObserverEntry[]) => {
            const el = entries[0]?.target;
            if (!el) return;
            setShouldEnableTooltip(el.scrollWidth > el.clientWidth);
        },
        [setShouldEnableTooltip],
    );

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
        [onLongPress],
    );

    const handleTouchEnd = useCallback(() => {
        clearTimeout(longPressTimeoutRef.current);
    }, []);

    const iconOrImageElement = useMemo(() => {
        if (icons) {
            return (
                <ListItemIcon
                    icons={icons}
                    shouldHideBackground={!!shouldHideImageOrIconBackground}
                    shouldShowRoundIcon={!!shouldShowRoundImageOrIcon}
                />
            );
        }

        if (images) {
            return (
                <ListItemImage
                    cornerElement={cornerElement}
                    imageBackground={imageBackground}
                    careOfLocationId={careOfLocationId}
                    cornerImage={cornerImage}
                    images={images}
                    shouldOpenImageOnClick={shouldOpenImageOnClick}
                    shouldHideBackground={!!shouldHideImageOrIconBackground}
                    shouldShowRoundImage={!!shouldShowRoundImageOrIcon}
                    onImageError={onImageError}
                />
            );
        }

        return undefined;
    }, [
        careOfLocationId,
        cornerElement,
        cornerImage,
        icons,
        imageBackground,
        images,
        onImageError,
        shouldHideImageOrIconBackground,
        shouldOpenImageOnClick,
        shouldShowRoundImageOrIcon,
    ]);

    return (
        <StyledListItemHead
            as={shouldDisableAnimation ? undefined : motion[LIST_ITEM_HEAD_HTML_TAG]}
            animate={
                shouldDisableAnimation
                    ? undefined
                    : {
                          opacity: isTitleGreyed ? 0.5 : 1,
                      }
            }
            initial={shouldDisableAnimation ? undefined : false}
            transition={shouldDisableAnimation ? undefined : { duration: 0.2, type: 'tween' }}
            className="beta-chayns-list-item-head"
            $isClickable={typeof onClick === 'function' || isExpandable}
            $isAnyItemExpandable={isAnyItemExpandable}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={typeof onLongPress === 'function' ? handleTouchStart : undefined}
            onTouchEnd={typeof onLongPress === 'function' ? handleTouchEnd : undefined}
        >
            <StyledListItemHeadLeftWrapper>
                {isAnyItemExpandable && (
                    <StyledListItemHeadIndicator
                        as={
                            shouldDisableAnimation
                                ? undefined
                                : motion[LIST_ITEM_HEAD_INDICATOR_HTML_TAG]
                        }
                        animate={shouldDisableAnimation ? undefined : { rotate: isOpen ? 90 : 0 }}
                        initial={shouldDisableAnimation ? undefined : false}
                        transition={shouldDisableAnimation ? undefined : { type: 'tween' }}
                    >
                        {isExpandable && !shouldHideIndicator && (
                            <Icon icons={['fa fa-chevron-right']} />
                        )}
                    </StyledListItemHeadIndicator>
                )}
                {leftElements}
                {iconOrImageElement}
            </StyledListItemHeadLeftWrapper>
            <StyledListItemHeadContent
                $isIconOrImageGiven={iconOrImageElement !== undefined}
                $isOpen={isOpen}
            >
                <LayoutGroup>
                    <StyledListItemHeadTitle
                        as={
                            shouldDisableAnimation
                                ? undefined
                                : motion[LIST_ITEM_HEAD_TITLE_HTML_TAG]
                        }
                        layout="position"
                    >
                        <ListItemTitle
                            title={title}
                            titleElement={titleElement}
                            isOpen={isOpen}
                            shouldShowMultilineTitle={shouldShowMultilineTitle}
                            rightElements={rightElements}
                            onResize={handleShowTooltipResize}
                        />
                    </StyledListItemHeadTitle>
                    {shouldShowSubtitleRow && (
                        <StyledListItemHeadSubtitle>
                            <ListItemSubtitle
                                subtitle={subtitle}
                                isOpen={isOpen}
                                rightElements={rightElements}
                            />
                        </StyledListItemHeadSubtitle>
                    )}
                </LayoutGroup>
            </StyledListItemHeadContent>
            <ListItemRightElement rightElements={rightElements} />
            {hoverItem && (
                <StyledMotionListItemHeadHoverItemWrapper
                    className="beta-chayns-list-item-hover-item"
                    animate={{
                        marginLeft: shouldForceHover || shouldShowHoverItem ? 8 : 0,
                        opacity: shouldForceHover || shouldShowHoverItem ? 1 : 0,
                        width: shouldForceHover || shouldShowHoverItem ? 'auto' : 0,
                    }}
                    initial={false}
                    transition={{ duration: 0.15, type: 'tween' }}
                >
                    <StyledMotionListItemHeadHoverItem>
                        {hoverItem}
                    </StyledMotionListItemHeadHoverItem>
                </StyledMotionListItemHeadHoverItemWrapper>
            )}
        </StyledListItemHead>
    );
};

ListItemHead.displayName = 'ListItemHead';

export default ListItemHead;
