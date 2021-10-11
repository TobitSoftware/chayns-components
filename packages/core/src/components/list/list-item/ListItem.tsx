import { AnimatePresence, MotionConfig } from 'framer-motion';
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
import { ListContext } from '../List';
import ListItemBody from './list-item-body/ListItemBody';
import ListItemHead from './list-item-head/ListItemHead';
import { StyledListItem } from './ListItem.styles';

type ListItemProps = {
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
    icons?: [string, ...string[]];
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
     * Function to be executed when the header of the `ListItem` was clicked
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * Function to be executed when the header of the `ListItem` is pressed for
     * 400 milliseconds.
     */
    onLongPress?: TouchEventHandler<HTMLDivElement>;
    /**
     * Elements that are displayed on the right side of the header. If multiple
     * elements are specified, they are displayed one below the other.
     */
    rightElements?: [ReactNode, ...ReactNode[]];
    /**
     * Images of users should always be displayed in a round shape. Therefore
     * this property can be set to true.
     */
    shouldShowRoundImage?: boolean;
    /**
     * Subtitle of the `ListItem` displayed in the head below the title
     */
    subtitle?: ReactNode;
    /**
     * Title of the `ListItem` displayed in the head
     */
    title: ReactNode;
};

const ListItem: FC<ListItemProps> = ({
    children,
    hoverItem,
    icons,
    images,
    isDefaultOpen,
    onClick,
    onLongPress,
    rightElements,
    subtitle,
    shouldShowRoundImage,
    title,
}) => {
    const { incrementExpandableItemCount, isAnyItemExpandable, openItemUuid, updateOpenItemUuid } =
        useContext(ListContext);

    const uuid = useUuid();

    const isExpandable = children !== undefined;
    const isOpen = openItemUuid === uuid;

    const handleHeadClick = useCallback<MouseEventHandler<HTMLDivElement>>(
        (event) => {
            if (isExpandable) {
                updateOpenItemUuid(uuid);
            }

            if (typeof onClick === 'function') {
                onClick(event);
            }
        },
        [isExpandable, onClick, updateOpenItemUuid, uuid]
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

    return (
        <MotionConfig transition={{ duration: 0.35 }}>
            <StyledListItem
                className="beta-chayns-list-item"
                isClickable={typeof onClick === 'function' || isExpandable}
                isOpen={isOpen}
            >
                <ListItemHead
                    hoverItem={hoverItem}
                    icons={icons}
                    images={images}
                    isAnyItemExpandable={isAnyItemExpandable}
                    isExpandable={isExpandable}
                    isOpen={isOpen}
                    onClick={handleHeadClick}
                    onLongPress={onLongPress}
                    rightElements={rightElements}
                    subtitle={subtitle}
                    shouldShowRoundImage={shouldShowRoundImage}
                    title={title}
                />
                <AnimatePresence>
                    {isOpen && <ListItemBody>{children}</ListItemBody>}
                </AnimatePresence>
            </StyledListItem>
        </MotionConfig>
    );
};

ListItem.displayName = 'ListItem';

export default ListItem;
