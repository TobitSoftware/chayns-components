import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    ReactElement,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { useUuid } from '../../hooks/uuid';
import { getHeightOfSingleTextLine } from '../../utils/calculate';
import { StyledCheckbox, StyledCheckboxInput, StyledCheckboxLabel } from './Checkbox.styles';

export type CheckboxProps = {
    /**
     * Text for checkbox or switch
     */
    children?: ReactElement;
    /**
     * Indicates whether the checkbox or switch is selected
     */
    isChecked?: boolean;
    /**
     * Disables the checkbox or switch so it cannot be toggled
     */
    isDisabled?: boolean;
    /**
     * Function to be executed if the checked value changes
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Changes the design to use switch instead of checkbox
     */
    shouldShowAsSwitch?: boolean;
    /**
     * Whether the Checkbox should be displayed centered to the label or at the top
     */
    shouldShowCentered?: boolean;
};

const Checkbox: FC<CheckboxProps> = ({
    children,
    isChecked,
    isDisabled,
    onChange,
    shouldShowAsSwitch,
    shouldShowCentered = false,
}) => {
    const [isActive, setIsActive] = useState(isChecked ?? false);

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setIsActive(event.target.checked);

            if (typeof onChange === 'function') {
                onChange(event);
            }
        },
        [onChange],
    );

    const uuid = useUuid();

    const lineHeight = useMemo(
        () => (shouldShowCentered ? undefined : getHeightOfSingleTextLine()),
        [shouldShowCentered],
    );

    return (
        <StyledCheckbox>
            <StyledCheckboxInput
                checked={isChecked}
                disabled={isDisabled}
                id={uuid}
                onChange={handleChange}
                type="checkbox"
            />
            <StyledCheckboxLabel
                htmlFor={uuid}
                isChecked={isChecked ?? isActive}
                isDisabled={isDisabled}
                shouldShowAsSwitch={shouldShowAsSwitch}
                lineHeight={lineHeight}
            >
                {children}
            </StyledCheckboxLabel>
        </StyledCheckbox>
    );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
