import { MutableRefObject, useEffect, useState } from 'react';

export enum ContainerAnchor {
    BODY = 'body',
    DIALOG = '.dialog-inner',
    PAGE = '.page-provider',
    RESERVATION_WRAPPER = '.reservation-wrapper',
    ROOT = '#root',
    TAPP = '.tapp',
    WALLET = '.wallet',
}

const DEFAULT_CONTAINER_ANCHORS = [
    ContainerAnchor.BODY,
    ContainerAnchor.DIALOG,
    ContainerAnchor.PAGE,
    ContainerAnchor.ROOT,
    ContainerAnchor.TAPP,
];

interface UseContainerProps {
    ref?: MutableRefObject<HTMLDivElement | HTMLLabelElement | HTMLSpanElement | null>;
    anchorElement?: Element;
    container?: Element | null;
    anchors?: ContainerAnchor[];
}

export const useContainer = ({
    ref,
    anchorElement,
    container,
    anchors = DEFAULT_CONTAINER_ANCHORS,
}: UseContainerProps) => {
    const [newContainer, setNewContainer] = useState<Element | undefined>(container ?? undefined);

    // Get the closest container if none is set
    useEffect(() => {
        let el = anchorElement as HTMLElement;

        if (ref?.current) {
            el = ref.current as HTMLElement;
        }

        if (!container) {
            const reservationWrapperContainer = document.querySelector(
                ContainerAnchor.RESERVATION_WRAPPER,
            );

            const rootContainer = document.querySelector(ContainerAnchor.ROOT);
            const walletContainer = document.querySelector(ContainerAnchor.WALLET);

            const isInWallet =
                (reservationWrapperContainer && reservationWrapperContainer.contains(el)) ||
                (walletContainer && walletContainer.contains(el));

            if (isInWallet && rootContainer && rootContainer.contains(el)) {
                setNewContainer(rootContainer);

                return;
            }

            const element = el.closest(anchors?.join(', '));

            setNewContainer(element ?? undefined);
        }
    }, [anchors, container, anchorElement, ref]);

    useEffect(() => {
        if (container instanceof Element) {
            setNewContainer(container);
        }
    }, [container]);

    return newContainer;
};
