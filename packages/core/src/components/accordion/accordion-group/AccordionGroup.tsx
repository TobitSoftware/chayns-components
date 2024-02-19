import React, {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

type IUpdateOpenAccordionUuid = (uuid: string, options?: { shouldOnlyOpen?: boolean }) => void;

interface IAccordionGroupContext {
    isWrapped: boolean;
    openAccordionUuid?: string;
    setOpenAccordionUuid?: Dispatch<SetStateAction<string | undefined>>;
    updateOpenAccordionUuid?: IUpdateOpenAccordionUuid;
}

export const AccordionGroupContext = React.createContext<IAccordionGroupContext>({
    isWrapped: false,
    openAccordionUuid: undefined,
    setOpenAccordionUuid: undefined,
    updateOpenAccordionUuid: undefined,
});

AccordionGroupContext.displayName = 'AccordionGroupContext';

type AccordionGroupProps = {
    /**
     * The Accordions that should be grouped. Accordions with the same group are
     * automatically closed when an `Accordion` of the group is opened.
     */
    children: ReactNode;
    /**
     * This value must be set for nested AccordionGroup components. This adjusts the style of
     * the head and the padding of the content accordions.
     */
    isWrapped?: boolean;
    /**
     * Function that is executed when all accordions in group are closed.
     */
    onClose?: VoidFunction;
    /**
     * Function that is executed when any accordion in group will be opened.
     */
    onOpen?: VoidFunction;
};

const AccordionGroup: FC<AccordionGroupProps> = ({
    children,
    isWrapped = false,
    onClose,
    onOpen,
}) => {
    const [openAccordionUuid, setOpenAccordionUuid] =
        useState<IAccordionGroupContext['openAccordionUuid']>(undefined);

    const isInitialRenderRef = useRef(true);

    const updateOpenAccordionUuid = useCallback<IUpdateOpenAccordionUuid>(
        (uuid, { shouldOnlyOpen } = {}) => {
            setOpenAccordionUuid((currentOpenAccordionUuid) => {
                if (currentOpenAccordionUuid === uuid && shouldOnlyOpen !== true) {
                    return undefined;
                }

                return uuid;
            });
        },
        [setOpenAccordionUuid],
    );

    useEffect(() => {
        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
        } else if (typeof openAccordionUuid === 'string') {
            if (typeof onOpen === 'function') {
                onOpen();
            }
        } else if (typeof onClose === 'function') {
            onClose();
        }
    }, [onClose, onOpen, openAccordionUuid]);

    const providerValue = useMemo<IAccordionGroupContext>(
        () => ({
            isWrapped,
            openAccordionUuid,
            setOpenAccordionUuid,
            updateOpenAccordionUuid,
        }),
        [isWrapped, openAccordionUuid, updateOpenAccordionUuid],
    );

    return (
        <AccordionGroupContext.Provider value={providerValue}>
            {children}
        </AccordionGroupContext.Provider>
    );
};

AccordionGroup.displayName = 'AccordionGroup';

export default AccordionGroup;
