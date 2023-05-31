import Accordion from '@chayns-components/core/lib/components/accordion/Accordion';
import AccordionContent from '@chayns-components/core/lib/components/accordion/accordion-content/AccordionContent';
import Badge from '@chayns-components/core/lib/components/badge/Badge';
import Button from '@chayns-components/core/lib/components/button/Button';
import Icon from '@chayns-components/core/lib/components/icon/Icon';
import React, { FC, ReactNode, useCallback, useContext, useMemo } from 'react';
import { SetupWizardContext } from '../setup-wizard/SetupWizard';
import {
    StyledSetupWizardItem,
    StyledSetupWizardItemBadge,
    StyledSetupWizardItemContent,
    StyledSetupWizardItemContentButton,
    StyledSetupWizardItemContentChildren,
} from './SetupWizardItem.styles';

export type SetupWizardItemProps = {
    /**
     * The content that should be displayed inside the item.
     */
    children: ReactNode;
    /**
     * Whether the item is the last.
     */
    isLastItem?: boolean;
    /**
     * A function to be executed when the current step is completed.
     */
    onStepComplete?: (id: number) => void;
    /**
     * Whether the button should be enabled.
     */
    shouldEnableButton?: boolean;
    /**
     * The step of the item.
     */
    step: number;
    /**
     * The title of the item.
     */
    title: string;
};

const SetupWizardItem: FC<SetupWizardItemProps> = ({
    children,
    step,
    title,
    onStepComplete,
    shouldEnableButton = true,
    isLastItem = false,
}) => {
    const { selectedId, updateSelectedId } = useContext(SetupWizardContext);

    const handleClick = useCallback(() => {
        if (typeof updateSelectedId === 'function') {
            updateSelectedId(step + 1);
        }

        if (typeof onStepComplete === 'function') {
            onStepComplete(step);
        }
    }, [step, onStepComplete, updateSelectedId]);

    const shouldBeDisabled = useMemo(() => {
        if (step === 1) {
            return false;
        }

        return !!(selectedId && step > selectedId);
    }, [selectedId, step]);

    const rightElement = useMemo(() => {
        if (selectedId && step < selectedId) {
            return (
                <Badge>
                    <StyledSetupWizardItemBadge>
                        <Icon icons={['ts-check']} />
                    </StyledSetupWizardItemBadge>
                </Badge>
            );
        }

        return null;
    }, [selectedId, step]);

    return useMemo(
        () => (
            <StyledSetupWizardItem>
                <Accordion
                    title={`${step}. ${title}`}
                    isDefaultOpen={step === selectedId}
                    isDisabled={shouldBeDisabled}
                    rightElement={rightElement}
                >
                    <AccordionContent>
                        <StyledSetupWizardItemContent>
                            <StyledSetupWizardItemContentChildren>
                                {children}
                            </StyledSetupWizardItemContentChildren>
                            <StyledSetupWizardItemContentButton>
                                <Button onClick={handleClick} isDisabled={!shouldEnableButton}>
                                    {isLastItem ? 'Fertig' : 'Weiter'}
                                </Button>
                            </StyledSetupWizardItemContentButton>
                        </StyledSetupWizardItemContent>
                    </AccordionContent>
                </Accordion>
            </StyledSetupWizardItem>
        ),
        [
            children,
            handleClick,
            rightElement,
            selectedId,
            shouldBeDisabled,
            shouldEnableButton,
            step,
            title,
        ]
    );
};

SetupWizardItem.displayName = 'SetupWizardItem';

export default SetupWizardItem;
