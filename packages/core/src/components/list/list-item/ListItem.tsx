import { AnimatePresence, motion } from 'motion/react';
import React, {
    CSSProperties,
    forwardRef,
    MouseEventHandler,
    ReactNode,
    SyntheticEvent,
    TouchEventHandler,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useUuid } from '../../../hooks/uuid';
import type { IListItemRightElements } from '../../../types/list';
import { AccordionContext } from '../../accordion/Accordion';
import AreaContextProvider, { AreaContext } from '../../area-provider/AreaContextProvider';
import { ListContext } from '../List';
import ListItemBody from './list-item-body/ListItemBody';
import ListItemHead from './list-item-head/ListItemHead';
import { StyledListItem, StyledListItemTooltip } from './ListItem.styles';
import Tooltip from '../../tooltip/Tooltip';
import { LIST_ITEM_HTML_TAG } from '../../../constants/list';

export type ListItemElements = [ReactNode, ...ReactNode[]];

export interface ListItemSize {
    titleWidth: number;
    titleMaxWidth: number;
}

export type ListItemProps = {
    /**
     * The background color of the `ListItem`.
     */
    backgroundColor?: CSSProperties['backgroundColor'];
    /**
     * DEPRECATED: Use `cornerImage` instead.
     */
    careOfLocationId?: number;
    /**
     * The content of the `ListItem` body. When the `ListItem` has children,
     * it can be opened and also gets an icon as an indicator automatically.
     */
    children?: ReactNode;
    /**
     * The image that is displayed in the bottom right corner of the grouped image of list item.
     */
    cornerImage?: string;
    /**
     * Element that is displayed when hovering over the `ListItem` on the right
     * side. On mobile devices, this element is not displayed.
     */
    hoverItem?: ReactNode;
    /**
     * The FontAwesome or tobit icons to render like an image on the left side
     * of the header. Multiple icons are stacked. See the `Icon` component
     * documentation for more information.
     */
    icons?: string[];
    /**
     * The background of the image. This is only used if images are passed.
     */
    imageBackground?: CSSProperties['background'];
    /**
     * A list of image URLs that are displayed on the left side of the header.
     * If multiple URLs are passed, the image is assembled from the first three
     * image URLs as a puzzle.
     */
    images?: string[];
    /**
     * This can be used to automatically expand the `ListItem` during the first render.
     */
    isDefaultOpen?: boolean;
    /**
     * This overrides the internal opening state of the item and makes it controlled.
     */
    isOpen?: boolean;
    /**
     * Whether the ListItem locks disabled but has full functionality.
     */
    isTitleGreyed?: boolean;
    /**
     * Elements that are displayed on the left side of the header. If multiple
     * elements are specified, they are displayed one aside the other.
     */
    leftElements?: ListItemElements;
    /**
     * Function to be executed when the header of the `ListItem` was clicked
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * Function to be executed when the ListItem is closed.
     */
    onClose?: VoidFunction;
    /**
     * Function to be executed when the header of the `ListItem` is pressed for
     * 400 milliseconds.
     */
    onLongPress?: TouchEventHandler<HTMLDivElement>;
    /**
     * Function to be executed when the ListItem is opened.
     */
    onOpen?: VoidFunction;
    /**
     * Elements that are displayed on the right side of the header. If multiple
     * elements are specified, they are displayed one below the other.
     */
    rightElements?: IListItemRightElements;
    /**
     * This will force the background color of the ListItem to be used even if it is closed and not hovered.
     */
    shouldForceBackground?: boolean;
    /**
     * Whether the line should be forced, e.g., so that it is also displayed if the item is the last element in the list.
     */
    shouldForceBottomLine?: boolean;
    /**
     * Whether the hover item should be forced.
     */
    shouldForceHover?: boolean;
    /**
     * Whether the bottom line should be hidden.
     */
    shouldHideBottomLine?: boolean;
    /**
     * Whether the background and border of the shape on which the image or icon of the element is displayed should be
     * hidden.
     */
    shouldHideImageOrIconBackground?: boolean;
    /**
     * If the `ListItem` is expandable, the indicator is displayed on the left
     * side of the header. If this property is set to true, the indicator is
     * hidden.
     */
    shouldHideIndicator?: boolean;
    /**
     * Whether the image should be opened on click.
     */
    shouldOpenImageOnClick?: boolean;
    /**
     * Whether the layout animation should be prevented. This is useful when the
     * `ListItem` is used in a list with a lot of items and the layout animation
     * is not desired.
     */
    shouldPreventLayoutAnimation?: boolean;
    /**
     * This will render the ListItem closed on the first render.
     */
    shouldRenderClosed?: boolean;
    /**
     * Whether the image or icon should be displayed in a round shape. This should always be used for images of persons.
     */
    shouldShowRoundImageOrIcon?: boolean;
    /**
     * Whether a separator should be displayed below this item. In this case, the border is displayed thicker than normal.
     */
    shouldShowSeparatorBelow?: boolean;
    /**
     * Whether a Tooltip should be displayed on hover if the title is cut.
     */
    shouldShowTooltipOnTitleOverflow?: boolean;
    /**
     * Subtitle of the `ListItem` displayed in the head below the title
     */
    subtitle?: ReactNode;
    /**
     * Title of the `ListItem` displayed in the head
     */
    title: ReactNode;
    /**
     * Additional elements to be displayed in the header next to the title.
     */
    titleElement?: ReactNode;
    /**
     * Whether the ListItem Animation should be disabled.
     */
    shouldDisableAnimation?: boolean;
    /**
     * Optional Element to display in the right corner of the image
     */
    cornerElement?: ReactNode;
    /**
     * Optional handler for image load errors.
     */
    onImageError?: (event: SyntheticEvent<HTMLImageElement, Event>, index: number) => void;
    /**
     * Function to be executed if the size are changed.
     */
    onSizeChange?: (sizes: ListItemSize) => void;
};

export type ListItemRef = ListItemSize;

const ListItem = forwardRef<ListItemRef, ListItemProps>(
    (
        {
            backgroundColor,
            careOfLocationId,
            children,
            cornerImage,
            hoverItem,
            icons,
            imageBackground,
            images,
            isDefaultOpen,
            isOpen,
            isTitleGreyed,
            leftElements,
            onClick,
            onClose,
            onLongPress,
            onOpen,
            rightElements,
            shouldShowTooltipOnTitleOverflow = false,
            shouldForceBackground = false,
            shouldForceBottomLine = false,
            shouldForceHover = false,
            shouldHideBottomLine = false,
            shouldOpenImageOnClick = false,
            shouldHideImageOrIconBackground,
            shouldHideIndicator = false,
            shouldPreventLayoutAnimation = false,
            shouldRenderClosed = false,
            shouldShowRoundImageOrIcon,
            shouldShowSeparatorBelow = false,
            subtitle,
            title,
            onImageError,
            onSizeChange,
            titleElement,
            shouldDisableAnimation = false,
            cornerElement,
        },
        ref,
    ) => {
        const {
            incrementExpandableItemCount,
            isAnyItemExpandable,
            isWrapped,
            openItemUuid,
            updateOpenItemUuid,
        } = useContext(ListContext);

        const { isWrapped: isParentAccordionWrapped } = useContext(AccordionContext);

        const areaProvider = useContext(AreaContext);

        const isInitialRenderRef = useRef(true);

        const listItemRef = useRef<HTMLDivElement>(null);

        const uuid = useUuid();

        const isExpandable = children !== undefined;
        const isItemOpen = isOpen ?? openItemUuid === uuid;

        const onCloseRef = useRef(onClose);
        const onOpenRef = useRef(onOpen);

        const [shouldEnableTooltip, setShouldEnableTooltip] = useState(false);
        const [titleWidth, setTitleWidth] = useState(0);
        const [titleMaxWidth, setTitleMaxWidth] = useState(0);

        useEffect(() => {
            onCloseRef.current = onClose;
            onOpenRef.current = onOpen;
        }, [isOpen, onClose, onOpen]);

        useEffect(() => {
            if (isInitialRenderRef.current) {
                isInitialRenderRef.current = false;
            } else if (isItemOpen) {
                if (typeof onOpenRef.current === 'function') {
                    onOpenRef.current();
                }
            } else if (typeof onCloseRef.current === 'function') {
                onCloseRef.current();
            }
        }, [isItemOpen]);

        const handleHeadClick = useCallback<MouseEventHandler<HTMLDivElement>>(
            (event) => {
                if (isExpandable) {
                    updateOpenItemUuid(uuid);
                }

                if (typeof onClick === 'function') {
                    onClick(event);
                }
            },
            [isExpandable, onClick, updateOpenItemUuid, uuid],
        );

        useEffect(() => {
            if (isExpandable && !shouldHideIndicator) {
                // The incrementExpandableItemCount function returns a cleanup
                // function to decrement expandableItemCount if component unmounts
                return incrementExpandableItemCount();
            }

            return undefined;
        }, [incrementExpandableItemCount, isExpandable, shouldHideIndicator]);

        useEffect(() => {
            if (isDefaultOpen) {
                updateOpenItemUuid(uuid, { shouldOnlyOpen: true });
            }
        }, [isDefaultOpen, updateOpenItemUuid, uuid]);

        const isClickable = typeof onClick === 'function' || isExpandable;

        useEffect(() => {
            if (typeof onSizeChange === 'function') {
                onSizeChange({
                    titleWidth,
                    titleMaxWidth,
                });
            }
        }, [onSizeChange, titleMaxWidth, titleWidth]);

        useImperativeHandle(
            ref,
            () => ({
                titleWidth,
                titleMaxWidth,
            }),
            [titleMaxWidth, titleWidth],
        );

        const handleTitleWidthChange = (width: number, maxWidth: number) => {
            setTitleWidth(width);
            setTitleMaxWidth(maxWidth);
        };

        const headContent = useMemo(
            () => (
                <ListItemHead
                    hoverItem={hoverItem}
                    careOfLocationId={careOfLocationId}
                    cornerElement={cornerElement}
                    cornerImage={cornerImage}
                    icons={icons}
                    imageBackground={imageBackground}
                    images={images}
                    isAnyItemExpandable={isAnyItemExpandable}
                    isExpandable={isExpandable}
                    isOpen={isItemOpen}
                    isTitleGreyed={isTitleGreyed}
                    leftElements={leftElements}
                    onClick={isClickable ? handleHeadClick : undefined}
                    onLongPress={onLongPress}
                    shouldForceHover={shouldForceHover}
                    rightElements={rightElements}
                    shouldHideImageOrIconBackground={shouldHideImageOrIconBackground}
                    shouldHideIndicator={shouldHideIndicator}
                    shouldOpenImageOnClick={shouldOpenImageOnClick}
                    shouldShowRoundImageOrIcon={shouldShowRoundImageOrIcon}
                    subtitle={subtitle}
                    title={title}
                    onTitleWidthChange={handleTitleWidthChange}
                    titleElement={titleElement}
                    setShouldEnableTooltip={setShouldEnableTooltip}
                    shouldDisableAnimation={shouldDisableAnimation}
                    onImageError={onImageError}
                />
            ),
            [
                onImageError,
                hoverItem,
                careOfLocationId,
                cornerElement,
                cornerImage,
                icons,
                imageBackground,
                images,
                isAnyItemExpandable,
                isExpandable,
                isItemOpen,
                isTitleGreyed,
                leftElements,
                isClickable,
                handleHeadClick,
                onLongPress,
                shouldForceHover,
                rightElements,
                shouldHideImageOrIconBackground,
                shouldHideIndicator,
                shouldOpenImageOnClick,
                shouldShowRoundImageOrIcon,
                subtitle,
                title,
                titleElement,
                shouldDisableAnimation,
            ],
        );

        return (
            <StyledListItem
                as={shouldDisableAnimation ? undefined : motion[LIST_ITEM_HTML_TAG]}
                animate={shouldDisableAnimation ? undefined : { height: 'auto', opacity: 1 }}
                className="beta-chayns-list-item"
                exit={shouldDisableAnimation ? undefined : { height: 0, opacity: 0 }}
                initial={shouldDisableAnimation ? undefined : { height: 0, opacity: 0 }}
                key={`list-item-${uuid}`}
                ref={listItemRef}
                layout={
                    shouldPreventLayoutAnimation || shouldDisableAnimation ? undefined : 'position'
                }
                $backgroundColor={backgroundColor}
                $isClickable={isClickable}
                $isInAccordion={
                    typeof isParentAccordionWrapped === 'boolean' &&
                    !areaProvider.shouldDisableListItemPadding
                }
                $isOpen={isItemOpen}
                $isWrapped={isWrapped}
                $shouldChangeColor={areaProvider.shouldChangeColor}
                $shouldForceBackground={shouldForceBackground}
                $shouldForceBottomLine={shouldForceBottomLine}
                $shouldHideBottomLine={shouldHideBottomLine}
                $shouldHideIndicator={shouldHideIndicator}
                $shouldShowSeparatorBelow={shouldShowSeparatorBelow}
            >
                <Tooltip
                    shouldUseFullWidth
                    isDisabled={!shouldShowTooltipOnTitleOverflow || !shouldEnableTooltip}
                    item={
                        <StyledListItemTooltip
                            style={{ cursor: 'default' }}
                            key={`list-item-tooltip-${uuid}`}
                        >
                            {title}
                        </StyledListItemTooltip>
                    }
                >
                    {headContent}
                </Tooltip>
                <AnimatePresence initial={false}>
                    {isExpandable && (isItemOpen || shouldRenderClosed) && (
                        <ListItemBody
                            id={uuid}
                            key={`listItemBody-${uuid}`}
                            shouldHideBody={shouldRenderClosed && !isItemOpen}
                        >
                            <AreaContextProvider>{children}</AreaContextProvider>
                        </ListItemBody>
                    )}
                </AnimatePresence>
            </StyledListItem>
        );
    },
);

ListItem.displayName = 'ListItem';

export default ListItem;
