import { AnimatePresence } from 'framer-motion';
import React, {
    forwardRef,
    MouseEvent,
    MouseEventHandler,
    ReactNode,
    ReactPortal,
    useCallback,
    useEffect,
    useImperativeHandle,
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
    icons: string[];
    key: string;
    onClick: (event?: MouseEvent<HTMLDivElement>) => void;
    text: string;
};

type ContextMenuRef = {
    hide: VoidFunction;
    show: VoidFunction;
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
    /**
     * Function to be executed when the content of the Context menu has been hidden.
     */
    onHide?: VoidFunction;
    /**
     * Function to be executed when the content of the Context menu has been shown.
     */
    onShow?: VoidFunction;
};

const ContextMenu = forwardRef<ContextMenuRef, ContextMenuProps>(
    (
        {
            alignment,
            children = <Icon icons={['ts-ellipsis_v']} />,
            container = document.body,
            coordinates,
            items,
            onHide,
            onShow,
        },
        ref
    ) => {
        const [internalCoordinates, setInternalCoordinates] = useState<ContextMenuCoordinates>({
            x: 0,
            y: 0,
        });
        const [internalAlignment, setInternalAlignment] = useState<ContextMenuAlignment>(
            ContextMenuAlignment.TopLeft
        );
        const [isContentShown, setIsContentShown] = useState(false);
        const [portal, setPortal] = useState<ReactPortal>();

        const uuid = useUuid();

        // ToDo: Replace with hook if new chayns api is ready
        const contextMenuContentRef = useRef<HTMLDivElement>(null);
        const contextMenuRef = useRef<HTMLSpanElement>(null);

        const handleHide = useCallback(() => {
            setIsContentShown(false);
        }, []);

        const handleShow = useCallback(async () => {
            const { isMobile, isTablet } = chayns.env;

            if (isMobile || isTablet) {
                // ToDo: Replace with new api function if new api is ready
                const { buttonType, selection } = await chayns.dialog.select({
                    buttons: [],
                    list: items.map(({ icons, text }, index) => ({
                        name: text,
                        value: index,
                        icon: icons[0],
                    })),
                    type: 2,
                });

                if (buttonType === 1 && typeof selection[0]?.value === 'number') {
                    items[selection[0].value]?.onClick();
                }
            } else if (contextMenuRef.current) {
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

                setIsContentShown(true);
            }
        }, [items]);

        const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                void handleShow();
            },
            [handleShow]
        );

        const handleDocumentClick = useCallback<EventListener>(
            (event) => {
                if (!contextMenuContentRef.current?.contains(event.target as Node)) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                handleHide();
            },
            [handleHide]
        );

        useImperativeHandle(
            ref,
            () => ({
                hide: handleHide,
                show: handleShow,
            }),
            [handleHide, handleShow]
        );

        useEffect(() => {
            if (isContentShown) {
                document.addEventListener('click', handleDocumentClick, true);
                window.addEventListener('blur', handleHide);

                if (typeof onShow === 'function') {
                    onShow();
                }
            } else if (typeof onHide === 'function') {
                onHide();
            }

            return () => {
                document.removeEventListener('click', handleDocumentClick, true);
                window.removeEventListener('blur', handleHide);
            };
        }, [handleDocumentClick, handleHide, isContentShown, onHide, onShow]);

        useEffect(() => {
            setPortal(() =>
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
                )
            );
        }, [
            alignment,
            container,
            coordinates,
            internalAlignment,
            internalCoordinates,
            isContentShown,
            items,
            uuid,
        ]);

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
    }
);

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
