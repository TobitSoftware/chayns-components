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
    ref: MutableRefObject<HTMLDivElement | HTMLLabelElement | HTMLSpanElement | null>;
    container?: Element | null;
    anchors?: ContainerAnchor[];
}

export const useContainer = ({
    ref,
    container,
    anchors = DEFAULT_CONTAINER_ANCHORS,
}: UseContainerProps) => {
    const [newContainer, setNewContainer] = useState<Element | null>(container ?? null);

    // Get the closest container if none is set
    useEffect(() => {
        if (ref.current && !container) {
            const el = ref.current as HTMLElement;

            const element = el.closest(anchors?.join(', '));

            setNewContainer(element);
        }
    }, [anchors, container, ref]);

    useEffect(() => {
        if (container instanceof Element) {
            setNewContainer(container);
        }
    }, [container]);

    return newContainer;
};
