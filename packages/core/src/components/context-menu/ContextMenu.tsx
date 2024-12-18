import { createDialog, DialogType } from 'chayns-api';
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
import { ContextMenuAlignment } from '../../types/contextMenu';
import { getIsTouch } from '../../utils/environment';
import Icon from '../icon/Icon';
import ContextMenuContent from './context-menu-content/ContextMenuContent';
import { StyledContextMenu } from './ContextMenu.styles';

export type ContextMenuCoordinates = {
    x: number;
    y: number;
};

export type ContextMenuItem = {
    icons: string[];
    key: string;
    onClick: (event?: MouseEvent<HTMLDivElement>) => Promise<void> | void;
    text: string;
};

export type ContextMenuRef = {
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
     * The element over which the content of the `ContextMenu` should be displayed. The default is an ellipsis icon.
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
     * Whether the ContextMenu is inside a dialog.
     */
    isInDialog?: boolean;
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
    /**
     * Whether the popup should be closed if its clicked.
     */
    shouldCloseOnPopupClick?: boolean;
};

interface SelectDialogResult {
    buttonType: number;
    result: number[];
}

const ContextMenu = forwardRef<ContextMenuRef, ContextMenuProps>(
    (
        {
            alignment,
            children = <Icon icons={['ts-ellipsis_v']} size={18} />,
            container,
            coordinates,
            isInDialog = false,
            items,
            onHide,
            onShow,
            shouldCloseOnPopupClick = true,
        },
        ref,
    ) => {
        const [internalCoordinates, setInternalCoordinates] = useState<ContextMenuCoordinates>({
            x: 0,
            y: 0,
        });
        const [newContainer, setNewContainer] = useState<Element | null>(container ?? null);

        const [internalAlignment, setInternalAlignment] = useState<ContextMenuAlignment>(
            ContextMenuAlignment.TopLeft,
        );

        const [isContentShown, setIsContentShown] = useState(false);
        const [portal, setPortal] = useState<ReactPortal>();

        const uuid = useUuid();

        // ToDo: Replace with hook if new chayns api is ready
        const contextMenuContentRef = useRef<HTMLDivElement>(null);
        const contextMenuRef = useRef<HTMLSpanElement>(null);

        useEffect(() => {
            if (contextMenuRef.current && !container) {
                const el = contextMenuRef.current as HTMLElement;

                const element =
                    el.closest('.dialog-inner') ||
                    el.closest('.page-provider') ||
                    el.closest('.tapp') ||
                    el.closest('body');

                setNewContainer(element);
            }
        }, [container]);

        useEffect(() => {
            if(container instanceof Element){
                setNewContainer(container)
            }
        }, [container]);

        const handleHide = useCallback(() => {
            setIsContentShown(false);
        }, []);

        const handleShow = useCallback(async () => {
            const isTouch = getIsTouch();

            if (isTouch) {
                const { result } = (await createDialog({
                    type: DialogType.SELECT,
                    buttons: [],
                    list: items.map(({ icons, text }, index) => ({
                        name: text,
                        id: index,
                        icon: icons[0],
                    })),
                }).open()) as SelectDialogResult;

                if (result && typeof result[0] === 'number') {
                    void items[result[0]]?.onClick();
                }
            } else if (contextMenuRef.current) {
                if (!newContainer) {
                    return;
                }

                const {
                    height: childrenHeight,
                    left: childrenLeft,
                    top: childrenTop,
                    width: childrenWidth,
                } = contextMenuRef.current.getBoundingClientRect();

                const { height, width, top, left } = newContainer.getBoundingClientRect();

                const x =
                    childrenLeft + (isInDialog ? 0 : window.scrollX) + childrenWidth / 2 - left;
                const y =
                    childrenTop + (isInDialog ? 0 : window.scrollY) + childrenHeight / 2 - top;

                setInternalCoordinates({ x, y });

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
        }, [isInDialog, items, newContainer]);

        const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                void handleShow();
            },
            [handleShow],
        );

        const handleDocumentClick = useCallback<EventListener>(
            (event) => {
                if (
                    !shouldCloseOnPopupClick &&
                    contextMenuContentRef.current?.contains(event.target as Node)
                ) {
                    return;
                }

                handleHide();
            },
            [handleHide, shouldCloseOnPopupClick],
        );

        useImperativeHandle(
            ref,
            () => ({
                hide: handleHide,
                show: handleShow,
            }),
            [handleHide, handleShow],
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
            if (!newContainer) {
                return;
            }

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
                    newContainer,
                ),
            );
        }, [
            alignment,
            newContainer,
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
    },
);

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
