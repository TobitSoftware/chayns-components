import Accordion from '@chayns-components/core/lib/components/accordion/Accordion';
import AccordionContent from '@chayns-components/core/lib/components/accordion/accordion-content/AccordionContent';
import Badge from '@chayns-components/core/lib/components/badge/Badge';
import Icon from '@chayns-components/core/lib/components/icon/Icon';
import React, { FC, ReactNode, useCallback, useContext, useMemo } from 'react';
import { SetupWizardContext } from '../setup-wizard/SetupWizard';
import { StyledSetupWizardItem, StyledSetupWizardItemBadge } from './SetupWizardItem.styles';

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
            <StyledSetupWizardItem>
                <Accordion
                    onOpen={handleAccordionOpen}
                    title={`${step}. ${title}`}
                    isDefaultOpen={id === selectedId}
                    isDisabled={shouldBeDisabled}
                    rightElement={rightElement}
                >
                    <AccordionContent>{children}</AccordionContent>
                </Accordion>
            </StyledSetupWizardItem>
        ),
        [children, handleAccordionOpen, id, rightElement, selectedId, shouldBeDisabled, step, title]
    );
};

SetupWizardItem.displayName = 'SetupWizardItem';

export default SetupWizardItem;