import { AnimatePresence } from 'motion/react';
import React, {
    CSSProperties,
    FC,
    MouseEventHandler,
    ReactNode,
    TouchEventHandler,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import { useUuid } from '../../../hooks/uuid';
import type { IListItemRightElements } from '../../../types/list';
import { AccordionContext } from '../../accordion/Accordion';
import AreaContextProvider from '../../area-provider/AreaContextProvider';
import { ListContext } from '../List';
import ListItemBody from './list-item-body/ListItemBody';
import ListItemHead from './list-item-head/ListItemHead';
import { StyledMotionListItem } from './ListItem.styles';

export type ListItemElements = [ReactNode, ...ReactNode[]];

export type ListItemProps = {
    /**
     * The locationId of the care-of site.
     */
    careOfLocationId?: number;
    /**
     * The content of the `ListItem` body. When the `ListItem` has children,
     * it can be opened and also gets an icon as an indicator automatically.
     */
    children?: ReactNode;
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
     * Whether the image or icon should be displayed in a round shape. This should be always used for images of persons.
     */
    shouldShowRoundImageOrIcon?: boolean;
    /**
     * Whether a separator should be displayed below this item. In this case, the border is displayed thicker than normal.
     */
    shouldShowSeparatorBelow?: boolean;
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
};

const ListItem: FC<ListItemProps> = ({
    careOfLocationId,
    children,
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
    shouldForceBackground = false,
    shouldHideBottomLine = false,
    shouldHideImageOrIconBackground,
    shouldHideIndicator = false,
    shouldOpenImageOnClick = false,
    shouldPreventLayoutAnimation = false,
    shouldShowRoundImageOrIcon,
    shouldShowSeparatorBelow = false,
    subtitle,
    title,
    titleElement,
}) => {
    const {
        incrementExpandableItemCount,
        isAnyItemExpandable,
        isWrapped,
        openItemUuid,
        updateOpenItemUuid,
    } = useContext(ListContext);

    const { isWrapped: isParentAccordionWrapped } = useContext(AccordionContext);

    const isInitialRenderRef = useRef(true);

    const uuid = useUuid();

    const isExpandable = children !== undefined;
    const isItemOpen = isOpen ?? openItemUuid === uuid;

    const onCloseRef = useRef(onClose);
    const onOpenRef = useRef(onOpen);

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
            // The incrementExpandableItemCount function returns an cleanup
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

    return (
        <StyledMotionListItem
            animate={{ height: 'auto', opacity: 1 }}
            className="beta-chayns-list-item"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            key={`list-item-${uuid}`}
            layout={shouldPreventLayoutAnimation ? undefined : 'position'}
            $isClickable={isClickable}
            $isInAccordion={typeof isParentAccordionWrapped === 'boolean'}
            $isOpen={isItemOpen}
            $isWrapped={isWrapped}
            $shouldForceBackground={shouldForceBackground}
            $shouldHideBottomLine={shouldHideBottomLine}
            $shouldHideIndicator={shouldHideIndicator}
            $shouldShowSeparatorBelow={shouldShowSeparatorBelow}
        >
            <ListItemHead
                hoverItem={hoverItem}
                careOfLocationId={careOfLocationId}
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
                rightElements={rightElements}
                shouldHideImageOrIconBackground={shouldHideImageOrIconBackground}
                shouldHideIndicator={shouldHideIndicator}
                shouldOpenImageOnClick={shouldOpenImageOnClick}
                shouldShowRoundImageOrIcon={shouldShowRoundImageOrIcon}
                subtitle={subtitle}
                title={title}
                titleElement={titleElement}
            />
            <AnimatePresence initial={false}>
                {isExpandable && isItemOpen && (
                    <ListItemBody id={uuid}>
                        <AreaContextProvider>{children}</AreaContextProvider>
                    </ListItemBody>
                )}
            </AnimatePresence>
        </StyledMotionListItem>
    );
};

ListItem.displayName = 'ListItem';

export default ListItem;
