import React, {
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import Accordion from '../../accordion/Accordion';
import AccordionContent from '../../accordion/accordion-content/AccordionContent';
import Badge from '../../badge/Badge';
import Icon from '../../icon/Icon';
import { SetupWizardContext } from '../SetupWizard';
import { StyledSetupWizardItemBadge } from './SetupWizardItem.styles';

export type SetupWizardItemProps = {
    /**
     * The content that should be displayed inside the item.
     */
    children: ReactNode;
    /**
     * The id of the item.
     */
    id: number;
    /**
     * The step of the item.
     */
    step: number;
    /**
     * The title of the item.
     */
    title: string;
};

const SetupWizardItem: FC<SetupWizardItemProps> = ({ children, step, title, id }) => {
    const { selectedId, updateSelectedId, activeId } = useContext(SetupWizardContext);

    const [shouldOpen, setShouldOpen] = useState<boolean>(false);

    const initialRender = useRef(0);

    useEffect(() => {
        initialRender.current++;
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShouldOpen(id === selectedId);
        }, 5);

        return () => clearTimeout(timeout);
    }, [id, selectedId]);

    const shouldBeDisabled = useMemo(() => {
        if (typeof activeId === 'number' && activeId === id) {
            return false;
        }

        return typeof activeId === 'number' && activeId < id;
    }, [activeId, id]);

    const rightElement = useMemo(() => {
        if (activeId && id < activeId) {
            return (
                <Badge>
                    <StyledSetupWizardItemBadge>
                        <Icon icons={['ts-check']} />
                    </StyledSetupWizardItemBadge>
                </Badge>
            );
        }

        return null;
    }, [activeId, id]);

    const handleAccordionOpen = useCallback(() => {
        if (typeof updateSelectedId === 'function') {
            updateSelectedId(id);
        }
    }, [id, updateSelectedId]);

    return useMemo(
        () => (
            <Accordion
                onOpen={handleAccordionOpen}
                title={`${step}. ${title}`}
                isOpened={shouldOpen}
                isDisabled={shouldBeDisabled}
                rightElement={rightElement}
            >
                <AccordionContent>{children}</AccordionContent>
            </Accordion>
        ),
        [handleAccordionOpen, step, title, shouldOpen, shouldBeDisabled, rightElement, children],
    );
};

SetupWizardItem.displayName = 'SetupWizardItem';

export default SetupWizardItem;
