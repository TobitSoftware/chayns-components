import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { RadioButtonGroupContext } from './radio-button-group/RadioButtonGroup';
import {
    StyledRadioButton,
    StyledRadioButtonCheckBox,
    StyledRadioButtonCheckBoxMark,
    StyledRadioButtonLabel,
    StyledRadioButtonPseudoCheckBox,
} from './RadioButton.styles';
import type { RadioButtonItem } from './types';

export type RadioButtonProps = {
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
                isDisabled={isDisabled}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <StyledRadioButtonPseudoCheckBox isChecked={isMarked}>
                    <StyledRadioButtonCheckBoxMark isHovered={isHovered} isSelected={isMarked} />
                </StyledRadioButtonPseudoCheckBox>
                <StyledRadioButtonCheckBox
                    disabled={isDisabled}
                    type="radio"
                    checked={isMarked}
                    onChange={() => {}}
                />
                {label && <StyledRadioButtonLabel>{label}</StyledRadioButtonLabel>}
            </StyledRadioButton>
        ),
        [handleClick, handleMouseEnter, isDisabled, isHovered, isMarked, label]
    );
};

RadioButton.displayName = 'RadioButton';

export default RadioButton;
