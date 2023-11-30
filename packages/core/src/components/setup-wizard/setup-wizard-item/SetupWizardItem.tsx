import React, { FC, ReactNode, useCallback, useContext, useMemo } from 'react';
import Accordion from '../../accordion/Accordion';
import AccordionContent from '../../accordion/accordion-content/AccordionContent';
import Badge from '../../badge/Badge';
import Icon from '../../icon/Icon';
import { SetupWizardContext } from '../SetupWizard';
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
     * This value must be set if the SetupWizard is inside an Accordion.
     */
    isWrapped?: boolean;
    /**
     * The step of the item.
     */
    step: number;
    /**
     * The title of the item.
     */
    title: string;
};

const SetupWizardItem: FC<SetupWizardItemProps> = ({ children, step, title, id, isWrapped }) => {
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
                    isWrapped={isWrapped}
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
        [
            children,
            handleAccordionOpen,
            id,
            isWrapped,
            rightElement,
            selectedId,
            shouldBeDisabled,
            step,
            title,
        ],
    );
};

SetupWizardItem.displayName = 'SetupWizardItem';

export default SetupWizardItem;
