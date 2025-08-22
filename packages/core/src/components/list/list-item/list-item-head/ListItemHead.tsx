import { LayoutGroup, motion } from 'motion/react';
import React, {
    CSSProperties,
    FC,
    MouseEventHandler,
    ReactNode,
    TouchEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { IListItemRightElements } from '../../../../types/list';
import { getElementClickEvent } from '../../../../utils/accordion';
import Icon from '../../../icon/Icon';
import ListItemIcon from './list-item-icon/ListItemIcon';
import ListItemImage from './list-item-image/ListItemImage';
import ListItemRightElements from './list-item-right-elements/ListItemRightElements';
import {
    StyledListItemHeadContent,
    StyledListItemHeadLeftWrapper,
    StyledListItemHeadSubtitle,
    StyledListItemHeadSubtitleText,
    StyledListItemHeadTitleContent,
    StyledListItemHeadTitleElement,
    StyledListItemHeadTitleText,
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
}) => {
    const [shouldShowHoverItem, setShouldShowHoverItem] = useState(false);

    const titleWrapperRef = useRef<HTMLDivElement>(null);

    const longPressTimeoutRef = useRef<number>();

    const shouldShowSubtitleRow = subtitle || typeof subtitle === 'string';

    const shouldShowMultilineTitle = useMemo(() => !subtitle, [subtitle]);

    const handleShowTooltipResize = useCallback(
        (entries: ResizeObserverEntry[]) => {
            const el = entries[0]?.target;
            if (!el) return;
            setShouldEnableTooltip(el.scrollWidth > el.clientWidth);
        },
        [setShouldEnableTooltip],
    );

    useEffect(() => {
        const element = titleWrapperRef?.current;
        if (!element) return undefined;

        const resizeObserver = new ResizeObserver(handleShowTooltipResize);
        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, [handleShowTooltipResize]);

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

    const shouldPreventRightElementClick = useMemo(() => {
        if (!rightElements) return false;

        if (
            typeof rightElements === 'object' &&
            ('bottom' in rightElements || 'center' in rightElements || 'top' in rightElements)
        ) {
            if (rightElements.bottom && getElementClickEvent(rightElements.bottom)) {
                return true;
            }

            if (rightElements.center && getElementClickEvent(rightElements.center)) {
                return true;
            }

            if (rightElements.top && getElementClickEvent(rightElements.top)) {
                return true;
            }
        } else {
            return getElementClickEvent(rightElements as ReactNode);
        }

        return false;
    }, [rightElements]);

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
                    imageBackground={imageBackground}
                    careOfLocationId={careOfLocationId}
                    cornerImage={cornerImage}
                    images={images}
                    shouldOpenImageOnClick={shouldOpenImageOnClick}
                    shouldHideBackground={!!shouldHideImageOrIconBackground}
                    shouldShowRoundImage={!!shouldShowRoundImageOrIcon}
                />
            );
        }

        return undefined;
    }, [
        careOfLocationId,
        cornerImage,
        icons,
        imageBackground,
        images,
        shouldHideImageOrIconBackground,
        shouldOpenImageOnClick,
        shouldShowRoundImageOrIcon,
    ]);

    return (
        <StyledListItemHead
            as={shouldDisableAnimation ? undefined : motion[LIST_ITEM_HEAD_HTML_TAG]}
            layout={shouldDisableAnimation ? undefined : 'size'}
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
                        <StyledListItemHeadTitleContent>
                            <StyledListItemHeadTitleText
                                $isEllipsis={!isOpen}
                                ref={titleWrapperRef}
                                $shouldShowMultilineTitle={shouldShowMultilineTitle}
                            >
                                {title}
                            </StyledListItemHeadTitleText>
                            <StyledListItemHeadTitleElement>
                                {titleElement}
                            </StyledListItemHeadTitleElement>
                        </StyledListItemHeadTitleContent>
                    </StyledListItemHeadTitle>
                    {shouldShowSubtitleRow && (
                        <StyledListItemHeadSubtitle>
                            <StyledListItemHeadSubtitleText $isOpen={isOpen}>
                                {subtitle}
                            </StyledListItemHeadSubtitleText>
                        </StyledListItemHeadSubtitle>
                    )}
                </LayoutGroup>
            </StyledListItemHeadContent>
            {rightElements && (
                <ListItemRightElements
                    rightElements={rightElements}
                    shouldPreventRightElementClick={shouldPreventRightElementClick}
                />
            )}
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
