import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, { FC, MouseEventHandler, ReactNode, useCallback, useContext, useEffect } from 'react';
import { useUuid } from '../../../hooks/uuid';
import { ListContext } from '../List';
import { StyledListItem } from './ListItem.styles';
import ListItemBody from './list-item-body/ListItemBody';
import ListItemHead from './list-item-head/ListItemHead';

type ListItemProps = {
    /**
     * The content of the `ListItem` body. When the `ListItem` has children,
     * it can be opened and also gets an icon as an indicator automatically.
     */
    children?: ReactNode;
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
     * Function to be executed when the header of the `ListItem` was clicked
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
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
    icons,
    images,
    onClick,
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
        [isExpandable, onClick]
    );

    useEffect(() => {
        if (children) {
            // The incrementExpandableItemCount function returns an cleanup
            // function to decrement expandableItemCount if component unmounts
            return incrementExpandableItemCount();
        }

        return undefined;
    }, [incrementExpandableItemCount]);

    return (
        <MotionConfig transition={{ duration: 0.25 }}>
            <StyledListItem
                className="beta-chayns-list-item"
                isClickable={typeof onClick === 'function' || isExpandable}
                isOpen={isOpen}
            >
                <ListItemHead
                    icons={icons}
                    images={images}
                    isAnyItemExpandable={isAnyItemExpandable}
                    isExpandable={isExpandable}
                    isOpen={isOpen}
                    onClick={handleHeadClick}
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
