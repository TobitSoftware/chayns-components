import { AnimatePresence, MotionConfig } from 'framer-motion';
import React, {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useUuid } from '../../../hooks/uuid';
import { AreaContext } from '../../area-provider/AreaContextProvider';

type IUpdateOpenAccordionUuid = (uuid: string, options?: { shouldOnlyOpen?: boolean }) => void;
type IUpdateAccordionUuids = (uuids: string[]) => void;

interface IAccordionGroupContext {
    isWrapped?: boolean;
    openAccordionUuid?: string;
    setOpenAccordionUuid?: Dispatch<SetStateAction<string | undefined>>;
    updateOpenAccordionUuid?: IUpdateOpenAccordionUuid;
    accordionUuids?: string[];
    updateAccordionUuids?: IUpdateAccordionUuids;
    accordionGroupUuid?: string;
}

export const AccordionGroupContext = React.createContext<IAccordionGroupContext>({
    isWrapped: undefined,
    openAccordionUuid: undefined,
    setOpenAccordionUuid: undefined,
    updateOpenAccordionUuid: undefined,
    accordionUuids: undefined,
    updateAccordionUuids: undefined,
    accordionGroupUuid: undefined,
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

const AccordionGroup: FC<AccordionGroupProps> = ({ children, isWrapped, onClose, onOpen }) => {
    const [openAccordionUuid, setOpenAccordionUuid] =
        useState<IAccordionGroupContext['openAccordionUuid']>(undefined);
    const [accordionUuids, setAccordionUuids] = useState<string[]>();

    const accordionGroupId = useUuid();

    const isInitialRenderRef = useRef(true);

    const updateAccordionUuids = useCallback((uuids: string[]) => {
        setAccordionUuids(uuids);
    }, []);

    const areaProvider = useContext(AreaContext);

    const shouldWrap = areaProvider.shouldChangeColor ? true : isWrapped;

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
        const elements = document.querySelectorAll('[data-uuid]');
        const newOrder = Array.from(elements).map((el) => el.getAttribute('data-uuid'));

        const result: string[] = [];

        newOrder.forEach((uuid) => {
            if (uuid?.includes(accordionGroupId)) {
                result.push(uuid.replace(`${accordionGroupId}---`, ''));
            }
        });

        updateAccordionUuids(result);
    }, [accordionGroupId, updateAccordionUuids]);

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
            isWrapped: shouldWrap,
            openAccordionUuid,
            setOpenAccordionUuid,
            updateOpenAccordionUuid,
            updateAccordionUuids,
            accordionUuids,
            accordionGroupUuid: accordionGroupId,
        }),
        [
            accordionGroupId,
            accordionUuids,
            shouldWrap,
            openAccordionUuid,
            updateAccordionUuids,
            updateOpenAccordionUuid,
        ],
    );

    return (
        <AccordionGroupContext.Provider value={providerValue}>
            <MotionConfig transition={{ type: 'tween' }}>
                <AnimatePresence initial={false}>{children}</AnimatePresence>
            </MotionConfig>
        </AccordionGroupContext.Provider>
    );
};

AccordionGroup.displayName = 'AccordionGroup';

export default AccordionGroup;
