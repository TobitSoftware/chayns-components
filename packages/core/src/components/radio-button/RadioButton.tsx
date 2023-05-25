import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { RadioButtonItem } from './interface';
import { RadioButtonGroupContext } from './radio-button-group/RadioButtonGroup';
import {
    StyledRadioButton,
    StyledRadioButtonCheckBox,
    StyledRadioButtonCheckBoxMark,
    StyledRadioButtonLabel,
} from './RadioButton.styles';

export type RadioButtonProps = {
    /**
     * Whether the radio button should be checked.
     */
    isChecked?: boolean;
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

const RadioButton: FC<RadioButtonProps> = ({ isChecked, label, onChange, id }) => {
    const { selectedRadioButtonId, updateSelectedRadioButtonId } =
        useContext(RadioButtonGroupContext);

    const [internalIsChecked, setInternalIsChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isInGroup = typeof updateSelectedRadioButtonId === 'function';

    const isMarked = isInGroup ? selectedRadioButtonId === id : internalIsChecked;

    const isInitialRenderRef = useRef(true);

    useEffect(() => {
        if (isChecked) {
            setInternalIsChecked(isChecked);
        }
    }, [isChecked]);

    useEffect(() => {
        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
        } else if (typeof onChange === 'function') {
            onChange({ isChecked: isMarked, id });
        }
    }, [id, isMarked, onChange]);

    const handleClick = useCallback(() => {
        if (typeof updateSelectedRadioButtonId === 'function') {
            updateSelectedRadioButtonId(id);
        }

        setInternalIsChecked((prevState) => !prevState);
    }, [id, updateSelectedRadioButtonId]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return useMemo(
        () => (
            <StyledRadioButton
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <StyledRadioButtonCheckBoxMark isHovered={isHovered} isSelected={isMarked} />
                <StyledRadioButtonCheckBox type="radio" checked={isMarked} onChange={() => {}} />
                {label && <StyledRadioButtonLabel>{label}</StyledRadioButtonLabel>}
            </StyledRadioButton>
        ),
        [handleClick, isHovered, isMarked, label]
    );
};

RadioButton.displayName = 'RadioButton';

export default RadioButton;
