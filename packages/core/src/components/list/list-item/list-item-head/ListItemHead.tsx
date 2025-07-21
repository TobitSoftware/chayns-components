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
    StyledListItemHead,
    StyledListItemHeadContent,
    StyledListItemHeadLeftWrapper,
    StyledListItemHeadSubtitle,
    StyledListItemHeadSubtitleText,
    StyledListItemHeadTitle,
    StyledListItemHeadTitleContent,
    StyledListItemHeadTitleElement,
    StyledListItemHeadTitleText,
    StyledMotionListItemHeadHoverItem,
    StyledMotionListItemHeadHoverItemWrapper,
    StyledMotionListItemHeadIndicator,
} from './ListItemHead.styles';
import { ResizePayload, useResizeDetector } from 'react-resize-detector';

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
}) => {
    const [shouldShowHoverItem, setShouldShowHoverItem] = useState(false);
    const [, setIsFirstRender] = useState(false);

    const longPressTimeoutRef = useRef<number>();

    const shouldShowSubtitleRow = subtitle || typeof subtitle === 'string';

    const shouldShowMultilineTitle = useMemo(() => !subtitle, [subtitle]);

    const handleShowTooltipResize = useCallback(
        (data: ResizePayload) => {
            const el = data.entry?.target;
            if (!el) return;
            setShouldEnableTooltip(el.scrollWidth > el.clientWidth);
        },
        [setShouldEnableTooltip],
    );

    const { ref: titleRef } = useResizeDetector<HTMLDivElement>({
        onResize: handleShowTooltipResize,
        skipOnMount: true,
    });
    const { ref: ellipsisTitleRef } = useResizeDetector<HTMLDivElement>({
        onResize: handleShowTooltipResize,
        skipOnMount: true,
    });

    // This is used to trigger a rerender, so the head height can be calculated
    useEffect(() => {
        setIsFirstRender(true);
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
            layout
            animate={{
                opacity: isTitleGreyed ? 0.5 : 1,
            }}
            initial={false}
            transition={{ duration: 0.2, type: 'tween' }}
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
                    <StyledMotionListItemHeadIndicator
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        initial={false}
                        transition={{ type: 'tween' }}
                    >
                        {isExpandable && !shouldHideIndicator && (
                            <Icon icons={['fa fa-chevron-right']} />
                        )}
                    </StyledMotionListItemHeadIndicator>
                )}
                {leftElements}
                {iconOrImageElement}
            </StyledListItemHeadLeftWrapper>
            <StyledListItemHeadContent
                $isIconOrImageGiven={iconOrImageElement !== undefined}
                $isOpen={isOpen}
            >
                <StyledListItemHeadTitle>
                    <StyledListItemHeadTitleContent>
                        {isOpen ? (
                            <StyledListItemHeadTitleText
                                key="title"
                                ref={titleRef}
                                $shouldShowMultilineTitle={shouldShowMultilineTitle}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {title}
                            </StyledListItemHeadTitleText>
                        ) : (
                            <StyledListItemHeadTitleText
                                key="ellipsisTitle"
                                $isEllipsis
                                ref={ellipsisTitleRef}
                                $shouldShowMultilineTitle={shouldShowMultilineTitle}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {title}
                            </StyledListItemHeadTitleText>
                        )}
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
