import { AnimatePresence } from 'framer-motion';
import React, {
    FC,
    MouseEventHandler,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useUuid } from '../../hooks/uuid';
import Icon from '../icon/Icon';
import { ContextMenuAlignment } from './constants/alignment';
import ContextMenuContent from './context-menu-content/ContextMenuContent';
import { StyledContextMenu } from './ContextMenu.styles';

export type ContextMenuCoordinates = {
    x: number;
    y: number;
};

export type ContextMenuItem = {
    icons: [string, ...string[]];
    key: string;
    onClick: MouseEventHandler<HTMLDivElement>;
    text: string;
};

type ContextMenuProps = {
    /**
     * Optional custom alignment used instead of calculating it using the
     * alignment within the page. The available alignment can be taken from the
     * ContextMenuAlignment enum.
     */
    alignment?: ContextMenuAlignment;
    /**
     * The element over which the content of the `ContextMenu` should be displayed.
     */
    children?: ReactNode;
    /**
     * The element where the content of the `ContextMenu` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * Optional own coordinates to be used instead of calculating the alignment
     * based on the alignment of the children.
     */
    coordinates?: ContextMenuCoordinates;
    /**
     * The items that will be displayed in the content of the `ContextMenu`.
     */
    items: ContextMenuItem[];
};

const ContextMenu: FC<ContextMenuProps> = ({
    alignment,
    children = <Icon icons={['ts-ellipsis_v']} />,
    container = document.body,
    coordinates,
    items,
}) => {
    const [internalCoordinates, setInternalCoordinates] = useState<ContextMenuCoordinates>({
        x: 0,
        y: 0,
    });
    const [internalAlignment, setInternalAlignment] = useState<ContextMenuAlignment>(
        ContextMenuAlignment.TopLeft
    );
    const [isContentShown, setIsContentShown] = useState(false);

    const uuid = useUuid();

    const contextMenuContentRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<HTMLSpanElement>(null);

    const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        event.preventDefault();
        event.stopPropagation();

        if (contextMenuRef.current) {
            const rootElement = document.querySelector('.tapp') || document.body;

            const {
                x,
                y,
                height: childrenHeight,
                width: childrenWidth,
            } = contextMenuRef.current.getBoundingClientRect();

            setInternalCoordinates({ x: x + childrenWidth / 2, y: y + childrenHeight / 2 });

            const { height, width } = rootElement.getBoundingClientRect();

            if (x < width / 2) {
                if (y < height / 2) {
                    setInternalAlignment(ContextMenuAlignment.BottomRight);
                } else {
                    setInternalAlignment(ContextMenuAlignment.TopRight);
                }
            } else if (y < height / 2) {
                setInternalAlignment(ContextMenuAlignment.BottomLeft);
            } else {
                setInternalAlignment(ContextMenuAlignment.TopLeft);
            }
        }

        setIsContentShown((currentIsContentShown) => !currentIsContentShown);
    }, []);

    const handleDocumentClick = useCallback<EventListener>((event) => {
        if (!contextMenuContentRef.current?.contains(event.target as Node)) {
            event.preventDefault();
            event.stopPropagation();
        }

        setIsContentShown(false);
    }, []);

    useEffect(() => {
        if (isContentShown) {
            document.addEventListener('click', handleDocumentClick, true);
        }

        return () => {
            document.removeEventListener('click', handleDocumentClick, true);
        };
    }, [handleDocumentClick, isContentShown]);

    const portal = useMemo(
        () =>
            createPortal(
                <AnimatePresence initial={false}>
                    {isContentShown && (
                        <ContextMenuContent
                            coordinates={coordinates ?? internalCoordinates}
                            items={items}
                            key={`contextMenu_${uuid}`}
                            alignment={alignment ?? internalAlignment}
                            ref={contextMenuContentRef}
                        />
                    )}
                </AnimatePresence>,
                container
            ),
        [
            container,
            coordinates,
            internalCoordinates,
            internalAlignment,
            isContentShown,
            items,
            alignment,
            uuid,
        ]
    );

    return (
        <>
            <StyledContextMenu
                className="beta-chayns-context-menu"
                onClick={handleClick}
                ref={contextMenuRef}
            >
                {children}
            </StyledContextMenu>
            {portal}
        </>
    );
};

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
