import { LayoutGroup, motion } from 'motion/react';
import React, {
    CSSProperties,
    FC,
    MouseEventHandler,
    ReactNode,
    SyntheticEvent,
    TouchEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { IListItemRightElements } from '../../../../types/list';
import ListItemIcon from './list-item-icon/ListItemIcon';
import ListItemImage from './list-item-image/ListItemImage';
import {
    StyledListItemHead,
    StyledListItemHeadContent,
    StyledListItemHeadIndicator,
    StyledListItemHeadLeftElements,
    StyledListItemHeadLeftWrapper,
    StyledListItemHeadSubtitle,
    StyledListItemHeadTitle,
    StyledMotionListItemHeadHoverItem,
    StyledMotionListItemHeadHoverItemWrapper,
} from './ListItemHead.styles';
import ListItemTitle from './list-item-title/ListItemTitle';
import ListItemSubtitle from './list-item-subtitle/ListItemSubtitle';
import ListItemRightElement from './list-item-right-element/ListItemRightElement';
import { useTheme } from 'styled-components';
import type { Theme } from '../../../color-scheme-provider/ColorSchemeProvider';
import { StyledUnicodeIcon } from '../../../icon/Icon.styles';
import { getIsExpandableIcon } from '../../../../utils/icon';

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
    onTitleWidthChange: (titleWidth: number, titleMaxWidth: number) => void;
    onImageError?: (event: SyntheticEvent<HTMLImageElement, Event>, index: number) => void;
    shouldAllowElementFocus?: boolean;
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
    onTitleWidthChange,
    onImageError,
    shouldAllowElementFocus = true,
}) => {
    const [shouldShowHoverItem, setShouldShowHoverItem] = useState(false);
    const [titleMaxWidth, setTitleMaxWidth] = useState(0);
    const [titleWidth, setTitleWidth] = useState(0);

    const longPressTimeoutRef = useRef<number>();
    const resizeSkipRef = useRef(true);
    const leftElementRef = useRef<HTMLDivElement>(null);

    const theme = useTheme() as Theme;

    const shouldShowSubtitleRow =
        subtitle ||
        typeof subtitle === 'string' ||
        (typeof rightElements === 'object' && rightElements && 'bottom' in rightElements);

    const shouldShowMultilineTitle = useMemo(() => !subtitle, [subtitle]);

    useEffect(() => {
        window.setTimeout(() => {
            resizeSkipRef.current = false;
        }, 200);
    }, []);

    useEffect(() => {
        onTitleWidthChange(titleWidth, titleMaxWidth);
    }, [onTitleWidthChange, titleMaxWidth, titleWidth]);

    const handleShowTooltipResize = useCallback(
        (entries: ResizeObserverEntry[]) => {
            setTitleWidth(entries[0]?.target.clientWidth ?? 0);

            if (resizeSkipRef.current) {
                return;
            }

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

    const handleTitleWidthChange = useCallback((width: number) => {
        setTitleMaxWidth(width);
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
                    onImageError={onImageError}
                    shouldOpenImageOnClick={shouldOpenImageOnClick}
                    shouldHideBackground={!!shouldHideImageOrIconBackground}
                    shouldShowRoundImage={!!shouldShowRoundImageOrIcon}
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

    const expandIcon = useMemo(() => {
        const internalIcon = getIsExpandableIcon(theme.accordionIcon);
        const internalIconStyle = theme?.iconStyle ? theme.iconStyle : 'fa-regular';
        return <StyledUnicodeIcon $icon={internalIcon} className={internalIconStyle} />;
    }, [theme.accordionIcon, theme.iconStyle]);

    useEffect(() => {
        const leftElementWrapper = leftElementRef.current;

        if (!leftElementWrapper) {
            return;
        }

        const focusableElements = Array.from(
            leftElementWrapper.querySelectorAll<HTMLElement>(
                'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]',
            ),
        );

        focusableElements.forEach((element) => {
            const currentElement = element;
            const datasetKey = 'listItemLeftElementOriginalTabIndex';

            if (shouldAllowElementFocus) {
                const originalTabIndex = currentElement.dataset[datasetKey];

                if (typeof originalTabIndex === 'string') {
                    if (originalTabIndex === '') {
                        currentElement.removeAttribute('tabindex');
                    } else {
                        currentElement.setAttribute('tabindex', originalTabIndex);
                    }

                    delete currentElement.dataset[datasetKey];
                }
            } else {
                if (typeof currentElement.dataset[datasetKey] !== 'string') {
                    currentElement.dataset[datasetKey] =
                        currentElement.getAttribute('tabindex') ?? '';
                }

                currentElement.setAttribute('tabindex', '-1');
            }
        });
    }, [leftElements, shouldAllowElementFocus]);

    return (
        <StyledListItemHead
            as={shouldDisableAnimation ? undefined : motion.div}
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
                        as={shouldDisableAnimation ? undefined : motion.div}
                        animate={shouldDisableAnimation ? undefined : { rotate: isOpen ? 90 : 0 }}
                        initial={shouldDisableAnimation ? undefined : false}
                        transition={shouldDisableAnimation ? undefined : { type: 'tween' }}
                    >
                        {isExpandable && !shouldHideIndicator && expandIcon}
                    </StyledListItemHeadIndicator>
                )}
                {leftElements && (
                    <StyledListItemHeadLeftElements ref={leftElementRef} data-left-element="true">
                        {leftElements}
                    </StyledListItemHeadLeftElements>
                )}
                {iconOrImageElement}
            </StyledListItemHeadLeftWrapper>
            <StyledListItemHeadContent
                $isIconOrImageGiven={iconOrImageElement !== undefined}
                $isOpen={isOpen}
            >
                <LayoutGroup>
                    <StyledListItemHeadTitle
                        as={shouldDisableAnimation ? undefined : motion.div}
                        layout="position"
                    >
                        <ListItemTitle
                            title={title}
                            titleElement={titleElement}
                            isOpen={isOpen}
                            shouldShowMultilineTitle={shouldShowMultilineTitle}
                            rightElements={rightElements}
                            onTitleWidthChange={handleTitleWidthChange}
                            onResize={handleShowTooltipResize}
                            shouldAllowRightElementFocus={shouldAllowElementFocus}
                        />
                    </StyledListItemHeadTitle>
                    {shouldShowSubtitleRow && (
                        <StyledListItemHeadSubtitle>
                            <ListItemSubtitle
                                subtitle={subtitle}
                                isOpen={isOpen}
                                rightElements={rightElements}
                                shouldAllowRightElementFocus={shouldAllowElementFocus}
                            />
                        </StyledListItemHeadSubtitle>
                    )}
                </LayoutGroup>
            </StyledListItemHeadContent>
            <ListItemRightElement
                rightElements={rightElements}
                shouldAllowFocus={shouldAllowElementFocus}
            />
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
