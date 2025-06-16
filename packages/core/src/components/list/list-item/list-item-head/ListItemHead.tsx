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
    StyledListItemHeadSubtitleTextPseudo,
    StyledListItemHeadTitle,
    StyledListItemHeadTitleContent,
    StyledListItemHeadTitleElement,
    StyledListItemHeadTitleText,
    StyledListItemHeadTitleTextPseudo,
    StyledMotionListItemHeadHoverItem,
    StyledMotionListItemHeadHoverItemWrapper,
    StyledMotionListItemHeadIndicator,
} from './ListItemHead.styles';

interface HeadHeight {
    closed: number;
    open: number;
}

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
    onTitleWidthChange: (width: number) => void;
    titleElement?: ReactNode;
    shouldForceHover?: boolean;
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
    onTitleWidthChange,
    shouldShowRoundImageOrIcon,
    subtitle,
    shouldForceHover,
    title,
    titleElement,
}) => {
    const [shouldRenderPseudoElements, setShouldRenderPseudoElements] = useState(true);
    const [shouldShowHoverItem, setShouldShowHoverItem] = useState(false);
    const [openTitleWidth, setOpenTitleWidth] = useState(0);
    const [headHeight, setHeadHeight] = useState<HeadHeight>({ closed: 64, open: 64 });
    const [, setIsFirstRender] = useState(false);

    const longPressTimeoutRef = useRef<number>();

    const pseudoTitleOpenRef = useRef<HTMLDivElement>(null);
    const pseudoTitleClosedRef = useRef<HTMLDivElement>(null);
    const pseudoSubtitleOpenRef = useRef<HTMLDivElement>(null);
    const pseudoSubtitleClosedRef = useRef<HTMLDivElement>(null);

    const shouldShowSubtitleRow = subtitle || typeof subtitle === 'string';

    useEffect(() => {
        if (pseudoTitleClosedRef.current) {
            const { width } = pseudoTitleClosedRef.current.getBoundingClientRect();

            onTitleWidthChange(width);
        }
    }, [onTitleWidthChange]);

    const shouldShowMultilineTitle = useMemo(() => !subtitle, [subtitle]);

    useEffect(() => {
        window.setTimeout(() => {
            if (pseudoTitleOpenRef.current && pseudoTitleClosedRef.current) {
                const { height: closedTitleHeight } =
                    pseudoTitleClosedRef.current.getBoundingClientRect();
                const { height: openTitleHeight, width: openWidth } =
                    pseudoTitleOpenRef.current.getBoundingClientRect();

                setOpenTitleWidth(openWidth);

                let closedHeight = closedTitleHeight + 24;
                let openHeight = openTitleHeight + 24;

                if (shouldShowSubtitleRow) {
                    if (pseudoSubtitleOpenRef.current && pseudoSubtitleClosedRef.current) {
                        const { height: closedSubtitleHeight } =
                            pseudoSubtitleClosedRef.current.getBoundingClientRect();
                        const { height: openSubtitleHeight } =
                            pseudoSubtitleOpenRef.current.getBoundingClientRect();

                        closedHeight += closedSubtitleHeight + 4;
                        openHeight += openSubtitleHeight + 4;
                    }
                }

                setHeadHeight({ closed: closedHeight, open: openHeight });

                setShouldRenderPseudoElements(false);
            }
        }, 100);
    }, [shouldShowSubtitleRow]);

    useEffect(() => {
        if (subtitle || title) setShouldRenderPseudoElements(true);
    }, [subtitle, title]);

    // This is used to trigger a rerender, so the head height can be calculated
    useEffect(() => {
        setIsFirstRender(true);
    }, []);

    const handleMouseEnter = useCallback(() => setShouldShowHoverItem(true), []);

    const handleMouseLeave = useCallback(() => setShouldShowHoverItem(false), []);

    const marginTop = useMemo(() => {
        const height = headHeight[isOpen ? 'open' : 'closed'];

        if (height < 64) {
            return (64 - height) / 2;
        }

        return 0;
    }, [headHeight, isOpen]);

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
            animate={{
                height: isOpen ? headHeight.open : headHeight.closed,
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
                $marginTop={marginTop}
                $isOpen={isOpen}
            >
                <StyledListItemHeadTitle>
                    <StyledListItemHeadTitleContent>
                        {shouldRenderPseudoElements && (
                            <>
                                <StyledListItemHeadTitleTextPseudo
                                    ref={pseudoTitleOpenRef}
                                    $isOpen
                                    $shouldShowMultilineTitle={false}
                                >
                                    {title}
                                </StyledListItemHeadTitleTextPseudo>
                                <StyledListItemHeadTitleTextPseudo
                                    ref={pseudoTitleClosedRef}
                                    $isOpen={false}
                                    $shouldShowMultilineTitle={shouldShowMultilineTitle}
                                >
                                    {title}
                                </StyledListItemHeadTitleTextPseudo>
                            </>
                        )}
                        <StyledListItemHeadTitleText
                            $isOpen={isOpen}
                            $width={openTitleWidth}
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
                        {shouldRenderPseudoElements && (
                            <>
                                <StyledListItemHeadSubtitleTextPseudo
                                    ref={pseudoSubtitleOpenRef}
                                    $isOpen
                                >
                                    {subtitle}
                                </StyledListItemHeadSubtitleTextPseudo>
                                <StyledListItemHeadSubtitleTextPseudo
                                    ref={pseudoSubtitleClosedRef}
                                    $isOpen={false}
                                >
                                    {subtitle}
                                </StyledListItemHeadSubtitleTextPseudo>
                            </>
                        )}
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
