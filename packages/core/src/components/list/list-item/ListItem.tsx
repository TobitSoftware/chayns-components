import { AnimatePresence } from 'framer-motion';
import React, {
    FC,
    MouseEventHandler,
    ReactNode,
    TouchEventHandler,
    useCallback,
    useContext,
    useEffect,
} from 'react';
import { useUuid } from '../../../hooks/uuid';
import AreaContextProvider from '../../area-provider/AreaContextProvider';
import { ListContext } from '../List';
import ListItemBody from './list-item-body/ListItemBody';
import ListItemHead from './list-item-head/ListItemHead';
import { StyledMotionListItem } from './ListItem.styles';

export type ListItemElements = [ReactNode, ...ReactNode[]];

export type ListItemProps = {
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
     * Function to be executed when the header of the `ListItem` was clicked
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * Function to be executed when the header of the `ListItem` is pressed for
     * 400 milliseconds.
     */
    onLongPress?: TouchEventHandler<HTMLDivElement>;
    /**
     * Elements that are displayed on the left side of the header. If multiple
     * elements are specified, they are displayed one aside the other.
     */
    leftElements?: ListItemElements;
    /**
     * Elements that are displayed on the right side of the header. If multiple
     * elements are specified, they are displayed one below the other.
     */
    rightElements?: ListItemElements;
    /**
     * Images of users should always be displayed in a round shape. Therefore,
     * this property can be set to true.
     */
    shouldShowRoundImage?: boolean;
    /**
     * Whether a separator should be displayed below this item. In this case, the border is displayed thicker than normal.
     */
    shouldShowSeparatorBelow?: boolean;
    /**
     * Whether a single rightElement should be centered. Only works if one rightElement is given.
     */
    shouldShowSingleRightElementCentered?: boolean;
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
    children,
    hoverItem,
    icons,
    images,
    isDefaultOpen,
    isOpen,
    onClick,
    onLongPress,
    leftElements,
    rightElements,
    shouldShowSingleRightElementCentered = false,
    subtitle,
    shouldShowRoundImage,
    shouldShowSeparatorBelow = false,
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

    const uuid = useUuid();

    const isExpandable = children !== undefined;
    const isItemOpen = isOpen ?? openItemUuid === uuid;

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
        if (isExpandable) {
            // The incrementExpandableItemCount function returns an cleanup
            // function to decrement expandableItemCount if component unmounts
            return incrementExpandableItemCount();
        }

        return undefined;
    }, [incrementExpandableItemCount, isExpandable]);

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
            $isClickable={isClickable}
            $isOpen={isItemOpen}
            $isWrapped={isWrapped}
            $shouldShowSeparatorBelow={shouldShowSeparatorBelow}
        >
            <ListItemHead
                hoverItem={hoverItem}
                icons={icons}
                images={images}
                isAnyItemExpandable={isAnyItemExpandable}
                isExpandable={isExpandable}
                isOpen={isItemOpen}
                leftElements={leftElements}
                onClick={isClickable ? handleHeadClick : undefined}
                onLongPress={onLongPress}
                rightElements={rightElements}
                subtitle={subtitle}
                shouldShowRoundImage={shouldShowRoundImage}
                shouldShowSingleRightElementCentered={shouldShowSingleRightElementCentered}
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
