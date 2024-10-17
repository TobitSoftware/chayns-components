import { AnimatePresence } from 'framer-motion';
import React, {
    FC,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
    useEffect,
} from 'react';
import { RadioButtonGroupContext } from './radio-button-group/RadioButtonGroup';
import {
    StyledLabelWrapper,
    StyledMotionRadioButtonChildren,
    StyledRadioButton,
    StyledRadioButtonCheckBox,
    StyledRadioButtonCheckBoxMark,
    StyledRadioButtonLabel,
    StyledRadioButtonPseudoCheckBox,
    StyledRadioButtonWrapper,
} from './RadioButton.styles';
import { RadioButtonRightElementMargin } from '../../types/radioButton';

export type RadioButtonProps = {
    /**
     * The children that should be displayed after the RadioButton is checked.
     */
    children?: ReactNode;
    /**
     * whether the RadioButton should be shown.
     */
    isDisabled?: boolean;
    /**
     * The id of the radio button.
     */
    id: string;
    /**
     * The label that should be displayed next to the radio button.
     */
    label?: string;
    /**
     * An element that should be displayed on the right side of the label.
     */
    rightElement?: ReactNode;
    /**
     * Whether the rightElement should only be displayed when the RadioButton is checked
     */
    shouldShowRightElementOnlyOnChecked?: boolean;
};

const RadioButton: FC<RadioButtonProps> = ({
    children,
    shouldShowRightElementOnlyOnChecked = false,
    label,
    id,
    rightElement,
    isDisabled = false,
}) => {
    const {
        selectedRadioButtonId,
        updateSelectedRadioButtonId,
        radioButtonRightElements,
        updateHasRightElement,
        radioButtonsCanBeUnchecked,
    } = useContext(RadioButtonGroupContext);

    const [internalIsChecked, setInternalIsChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isInGroup = typeof updateSelectedRadioButtonId === 'function';

    const isMarked = isInGroup ? selectedRadioButtonId === id : internalIsChecked;

    const uncheckable = radioButtonsCanBeUnchecked;

    const handleClick = useCallback(() => {
        if (isDisabled) {
            return;
        }

        if (uncheckable) {
            if (updateSelectedRadioButtonId) {
                updateSelectedRadioButtonId(id === selectedRadioButtonId ? undefined : id);
            }
            setInternalIsChecked((prev) => !prev);
            return;
        }
        if (typeof updateSelectedRadioButtonId === 'function') {
            updateSelectedRadioButtonId(id);
        }
        setInternalIsChecked(true);
    }, [id, isDisabled, uncheckable, selectedRadioButtonId, updateSelectedRadioButtonId]);

    const handleMouseEnter = useCallback(() => {
        if (!isDisabled) {
            setIsHovered(true);
        }
    }, [isDisabled]);

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const radioButtonRightElementMargin: RadioButtonRightElementMargin = useMemo(() => {
        if (!radioButtonRightElements) {
            return 'NONE';
        }

        const index = radioButtonRightElements.findIndex((element) => element.id === id);

        if (index < 0) {
            return 'NONE';
        }

        const prevButton = radioButtonRightElements[index - 1];
        const currentButton = radioButtonRightElements[index];
        const nextButton = radioButtonRightElements[index + 1];

        if (!currentButton?.hasRightElement) {
            return 'NONE';
        }

        switch (true) {
            case prevButton?.hasRightElement && !nextButton?.hasRightElement:
                return 'TOP';
            case !prevButton?.hasRightElement && nextButton?.hasRightElement:
                return 'BOTTOM';
            case currentButton?.hasRightElement &&
                !nextButton?.hasRightElement &&
                !prevButton?.hasRightElement:
                return 'NONE';
            default:
                return 'BOTH';
        }
    }, [id, radioButtonRightElements]);

    const shouldShowRightElement = useMemo(() => {
        if (rightElement) {
            if (shouldShowRightElementOnlyOnChecked) {
                return isMarked;
            }

            return true;
        }

        return false;
    }, [isMarked, rightElement, shouldShowRightElementOnlyOnChecked]);

    useEffect(() => {
        if (typeof updateHasRightElement === 'function') {
            window.setTimeout(() => {
                updateHasRightElement(id, shouldShowRightElement);
            }, 10);
        }
    }, [id, shouldShowRightElement, updateHasRightElement]);

    return useMemo(
        () => (
            <StyledRadioButton
                $isDisabled={isDisabled}
                $radioButtonRightElementMargin={radioButtonRightElementMargin}
            >
                <StyledRadioButtonWrapper>
                    <StyledRadioButtonPseudoCheckBox
                        $isDisabled={isDisabled}
                        $isChecked={isMarked}
                        onClick={handleClick}
                    >
                        <StyledRadioButtonCheckBoxMark
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            $isHovered={isHovered}
                            $isSelected={isMarked}
                            $isDisabled={isDisabled}
                        />
                    </StyledRadioButtonPseudoCheckBox>
                    <StyledRadioButtonCheckBox
                        onClick={handleClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        disabled={isDisabled}
                        $isDisabled={isDisabled}
                        type="radio"
                        checked={isMarked}
                        onChange={() => {}}
                    />
                    <StyledLabelWrapper>
                        {label && (
                            <StyledRadioButtonLabel
                                $isDisabled={isDisabled}
                                onClick={handleClick}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {label}
                            </StyledRadioButtonLabel>
                        )}
                        {shouldShowRightElement && rightElement}
                    </StyledLabelWrapper>
                </StyledRadioButtonWrapper>
                {children && (
                    <AnimatePresence initial={false}>
                        <StyledMotionRadioButtonChildren
                            animate={
                                isMarked
                                    ? { opacity: 1, height: 'auto' }
                                    : { opacity: 0, height: 0 }
                            }
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </StyledMotionRadioButtonChildren>
                    </AnimatePresence>
                )}
            </StyledRadioButton>
        ),
        [
            children,
            handleClick,
            handleMouseEnter,
            isDisabled,
            isHovered,
            isMarked,
            label,
            radioButtonRightElementMargin,
            rightElement,
            shouldShowRightElement,
        ],
    );
};

RadioButton.displayName = 'RadioButton';

export default RadioButton;
