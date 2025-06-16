import { MutableRefObject, useEffect, useState } from 'react';

export enum ContainerAnchor {
    TAPP = '.tapp',
    BODY = 'body',
    DIALOG = '.dialog-inner',
    PAGE = '.page-provider',
}

const DEFAULT_CONTAINER_ANCHORS = [
    ContainerAnchor.DIALOG,
    ContainerAnchor.PAGE,
    ContainerAnchor.TAPP,
    ContainerAnchor.BODY,
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
    const [newContainer, setNewContainer] = useState<Element | null>(container ?? null);

    // Get the closest container if none is set
    useEffect(() => {
        let el = anchorElement as HTMLElement;

        if (ref?.current) {
            el = ref.current as HTMLElement;
        }

        if (!container) {
            const element = el.closest(anchors?.join(', '));

            setNewContainer(element);
        }
    }, [anchors, container, anchorElement, ref]);

    useEffect(() => {
        if (container instanceof Element) {
            setNewContainer(container);
        }
    }, [container]);

    return newContainer;
};
