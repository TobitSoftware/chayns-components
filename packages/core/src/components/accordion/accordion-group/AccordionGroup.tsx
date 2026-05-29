import { AnimatePresence, MotionConfig } from 'motion/react';
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
type IUpdateActiveAccordionUuid = (uuid?: string) => void;
type IRegisterAccordionUuid = (uuid: string) => void;
type IUnregisterAccordionUuid = (uuid: string) => void;

interface IAccordionGroupContext {
    isWrapped?: boolean;
    openAccordionUuid?: string;
    setOpenAccordionUuid?: Dispatch<SetStateAction<string | undefined>>;
    updateOpenAccordionUuid?: IUpdateOpenAccordionUuid;
    accordionUuids?: string[];
    registerAccordionUuid?: IRegisterAccordionUuid;
    unregisterAccordionUuid?: IUnregisterAccordionUuid;
    activeAccordionUuid?: string;
    updateActiveAccordionUuid?: IUpdateActiveAccordionUuid;
    accordionGroupUuid?: string;
}

export const AccordionGroupContext = React.createContext<IAccordionGroupContext>({
    isWrapped: undefined,
    openAccordionUuid: undefined,
    setOpenAccordionUuid: undefined,
    updateOpenAccordionUuid: undefined,
    accordionUuids: undefined,
    registerAccordionUuid: undefined,
    unregisterAccordionUuid: undefined,
    activeAccordionUuid: undefined,
    updateActiveAccordionUuid: undefined,
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
    const [activeAccordionUuid, setActiveAccordionUuid] =
        useState<IAccordionGroupContext['activeAccordionUuid']>(undefined);

    const accordionGroupId = useUuid();

    const isInitialRenderRef = useRef(true);

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

    const sortAccordionUuidsByDom = useCallback(
        (uuids: string[]) => {
            if (typeof document === 'undefined') return uuids;

            const domOrderedUuids = Array.from(
                document.querySelectorAll<HTMLElement>(`[data-uuid^="${accordionGroupId}---"]`),
            )
                .map((element) => element.getAttribute('data-uuid')?.split('---')[1])
                .filter((uuid): uuid is string => Boolean(uuid));

            return domOrderedUuids.filter((uuid) => uuids.includes(uuid));
        },
        [accordionGroupId],
    );

    const registerAccordionUuid = useCallback<IRegisterAccordionUuid>(
        (uuid) => {
            setAccordionUuids((currentAccordionUuids = []) => {
                const nextAccordionUuids = currentAccordionUuids.includes(uuid)
                    ? currentAccordionUuids
                    : [...currentAccordionUuids, uuid];

                return sortAccordionUuidsByDom(nextAccordionUuids);
            });
        },
        [sortAccordionUuidsByDom],
    );

    const unregisterAccordionUuid = useCallback<IUnregisterAccordionUuid>((uuid) => {
        setAccordionUuids((currentAccordionUuids = []) =>
            currentAccordionUuids.filter((currentUuid) => currentUuid !== uuid),
        );
    }, []);

    const updateActiveAccordionUuid = useCallback<IUpdateActiveAccordionUuid>((uuid) => {
        setActiveAccordionUuid(uuid);
    }, []);

    useEffect(() => {
        if (!accordionUuids?.length) {
            setActiveAccordionUuid(undefined);
            return;
        }

        setActiveAccordionUuid((currentActiveAccordionUuid) =>
            currentActiveAccordionUuid && accordionUuids.includes(currentActiveAccordionUuid)
                ? currentActiveAccordionUuid
                : undefined,
        );
    }, [accordionUuids]);

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
            accordionUuids,
            registerAccordionUuid,
            unregisterAccordionUuid,
            activeAccordionUuid,
            updateActiveAccordionUuid,
            accordionGroupUuid: accordionGroupId,
        }),
        [
            accordionGroupId,
            accordionUuids,
            shouldWrap,
            openAccordionUuid,
            registerAccordionUuid,
            unregisterAccordionUuid,
            updateOpenAccordionUuid,
            activeAccordionUuid,
            updateActiveAccordionUuid,
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
