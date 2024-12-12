import React, {
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
import { useElementSize } from '../../../../hooks/useElementSize';
import type { IListItemRightElements } from '../../../../types/list';
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
    StyledMotionListItemHeadIndicator,
} from './ListItemHead.styles';

interface HeadHeight {
    closed: number;
    open: number;
}

type ListItemHeadProps = {
    hoverItem?: ReactNode;
    icons?: string[];
    images?: string[];
    isAnyItemExpandable: boolean;
    isExpandable: boolean;
    isOpen: boolean;
    leftElements?: ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onLongPress?: TouchEventHandler<HTMLDivElement>;
    rightElements?: IListItemRightElements;
    shouldHideImageOrIconBackground?: boolean;
    shouldHideIndicator?: boolean;
    subtitle?: ReactNode;
    shouldShowRoundImageOrIcon?: boolean;
    title: ReactNode;
    titleElement?: ReactNode;
    isDisabledButNotReallyDisabled?: boolean;
};

const ListItemHead: FC<ListItemHeadProps> = ({
    hoverItem,
    icons,
    images,
    isAnyItemExpandable,
    isExpandable,
    isOpen,
    leftElements,
    onClick,
    onLongPress,
    rightElements,
    shouldHideImageOrIconBackground,
    shouldHideIndicator,
    subtitle,
    isDisabledButNotReallyDisabled,
    shouldShowRoundImageOrIcon,
    title,
    titleElement,
}) => {
    const [shouldShowHoverItem, setShouldShowHoverItem] = useState(false);
    const [headHeight, setHeadHeight] = useState<HeadHeight>({
        closed: 40,
        open: 40,
    });
    const [isFirstRender, setIsFirstRender] = useState(false);

    const longPressTimeoutRef = useRef<number>();
    const pseudoTitleOpenRef = useRef<HTMLDivElement>(null);
    const pseudoTitleClosedRef = useRef<HTMLDivElement>(null);
    const pseudoSubtitleOpenRef = useRef<HTMLDivElement>(null);
    const pseudoSubtitleClosedRef = useRef<HTMLDivElement>(null);

    const closedTitle = useElementSize(pseudoTitleClosedRef);
    const openedTitle = useElementSize(pseudoTitleOpenRef);
    const closedSubtitle = useElementSize(pseudoSubtitleClosedRef);
    const openedSubtitle = useElementSize(pseudoSubtitleOpenRef);

    const shouldShowSubtitleRow = subtitle || typeof subtitle === 'string';

    useEffect(() => {
        if (closedTitle && openedTitle) {
            setHeadHeight({
                closed:
                    shouldShowSubtitleRow && closedSubtitle
                        ? closedSubtitle.height + 4 + closedTitle.height + 24
                        : closedTitle.height + 24,
                open:
                    shouldShowSubtitleRow && openedSubtitle
                        ? openedSubtitle.height + 4 + openedTitle.height + 24
                        : openedTitle.height + 24,
            });
        }
    }, [closedSubtitle, closedTitle, openedSubtitle, openedTitle, shouldShowSubtitleRow]);

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
                    images={images}
                    shouldHideBackground={!!shouldHideImageOrIconBackground}
                    shouldShowRoundImage={!!shouldShowRoundImageOrIcon}
                />
            );
        }

        return undefined;
    }, [icons, images, shouldHideImageOrIconBackground, shouldShowRoundImageOrIcon]);

    return (
        <StyledListItemHead
            animate={{ height: isOpen ? headHeight.open : headHeight.closed, opacity: isDisabledButNotReallyDisabled ? .5:1 }}
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
                        <StyledListItemHeadTitleTextPseudo ref={pseudoTitleOpenRef} $isOpen>
                            {title}
                        </StyledListItemHeadTitleTextPseudo>
                        <StyledListItemHeadTitleTextPseudo
                            ref={pseudoTitleClosedRef}
                            $isOpen={false}
                        >
                            {title}
                        </StyledListItemHeadTitleTextPseudo>
                        <StyledListItemHeadTitleText $isOpen={isOpen}>
                            {title}
                        </StyledListItemHeadTitleText>
                        <StyledListItemHeadTitleElement>
                            {titleElement}
                        </StyledListItemHeadTitleElement>
                    </StyledListItemHeadTitleContent>
                </StyledListItemHeadTitle>
                {shouldShowSubtitleRow && (
                    <StyledListItemHeadSubtitle>
                        <StyledListItemHeadSubtitleTextPseudo ref={pseudoSubtitleOpenRef} $isOpen>
                            {subtitle}
                        </StyledListItemHeadSubtitleTextPseudo>
                        <StyledListItemHeadSubtitleTextPseudo
                            ref={pseudoSubtitleClosedRef}
                            $isOpen={false}
                        >
                            {subtitle}
                        </StyledListItemHeadSubtitleTextPseudo>
                        <StyledListItemHeadSubtitleText $isOpen={isOpen}>
                            {subtitle}
                        </StyledListItemHeadSubtitleText>
                    </StyledListItemHeadSubtitle>
                )}
            </StyledListItemHeadContent>
            {rightElements && <ListItemRightElements rightElements={rightElements} />}
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
