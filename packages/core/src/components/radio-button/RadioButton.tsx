import { AnimatePresence } from 'framer-motion';
import React, {
    FC,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import type { RadioButtonItem } from '../../types/radioButton';
import { RadioButtonGroupContext } from './radio-button-group/RadioButtonGroup';
import {
    StyledMotionRadioButtonChildren,
    StyledRadioButton,
    StyledRadioButtonCheckBox,
    StyledRadioButtonCheckBoxMark,
    StyledRadioButtonLabel,
    StyledRadioButtonPseudoCheckBox,
    StyledRadioButtonWrapper,
} from './RadioButton.styles';

export type RadioButtonProps = {
    /**
     * The children that should be displayed after the RadioButton is checked.
     */
    children?: ReactNode;
    /**
     * Whether the radio button should be checked.
     */
    isChecked?: boolean;
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
     * Function to be executed when a button is checked.
     */
    onChange?: (item: RadioButtonItem) => void;
};

const RadioButton: FC<RadioButtonProps> = ({
    children,
    isChecked,
    label,
    onChange,
    id,
    isDisabled = false,
}) => {
    const { selectedRadioButtonId, updateSelectedRadioButtonId, setSelectedRadioButtonId } =
        useContext(RadioButtonGroupContext);

    const [internalIsChecked, setInternalIsChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isInGroup = typeof updateSelectedRadioButtonId === 'function';

    const isMarked = isInGroup ? selectedRadioButtonId === id : internalIsChecked;

    const isInitialRenderRef = useRef(true);

    useEffect(() => {
        if (typeof isChecked === 'boolean') {
            if (typeof setSelectedRadioButtonId === 'function') {
                setSelectedRadioButtonId(isChecked ? id : undefined);
            } else {
                setInternalIsChecked(isChecked);
            }
        }
    }, [id, isChecked, setSelectedRadioButtonId]);

    useEffect(() => {
        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
        } else if (typeof onChange === 'function') {
            onChange({ isChecked: isMarked, id });
        }
    }, [id, isMarked, onChange]);

    const handleClick = useCallback(() => {
        if (isDisabled) {
            return;
        }

        if (typeof updateSelectedRadioButtonId === 'function') {
            updateSelectedRadioButtonId(id);
        }

        setInternalIsChecked((prevState) => !prevState);
    }, [id, isDisabled, updateSelectedRadioButtonId]);

    const handleMouseEnter = useCallback(() => {
        if (!isDisabled) {
            setIsHovered(true);
        }
    }, [isDisabled]);

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return useMemo(
        () => (
            <StyledRadioButton
                $isDisabled={isDisabled}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <StyledRadioButtonWrapper>
                    <StyledRadioButtonPseudoCheckBox $isChecked={isMarked}>
                        <StyledRadioButtonCheckBoxMark
                            $isHovered={isHovered}
                            $isSelected={isMarked}
                        />
                    </StyledRadioButtonPseudoCheckBox>
                    <StyledRadioButtonCheckBox
                        disabled={isDisabled}
                        type="radio"
                        checked={isMarked}
                        onChange={() => {}}
                    />
                    {label && <StyledRadioButtonLabel>{label}</StyledRadioButtonLabel>}
                </StyledRadioButtonWrapper>
                {children && (
                    <AnimatePresence initial>
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
        [children, handleClick, handleMouseEnter, isDisabled, isHovered, isMarked, label],
    );
};

RadioButton.displayName = 'RadioButton';

export default RadioButton;
