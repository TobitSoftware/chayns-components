import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    ReactNode,
    useCallback,
    useState,
} from 'react';
import { useUuid } from '../../hooks/uuid';
import { StyledCheckbox, StyledCheckboxInput, StyledCheckboxLabel } from './Checkbox.styles';

export type CheckboxProps = {
    children?: ReactNode;
    /**
     *
     */
    isChecked?: boolean;
    /**
     *
     */
    isDisabled?: boolean;
    /**
     *
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     *
     */
    shouldShowAsSwitch?: boolean;
};

const Checkbox: FC<CheckboxProps> = ({
    children,
    isChecked,
    isDisabled,
    onChange,
    shouldShowAsSwitch,
}) => {
    const [isActive, setIsActive] = useState(isChecked ?? false);

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setIsActive(event.target.checked);

            if (typeof onChange === 'function') {
                onChange(event);
            }
        },
        [onChange]
    );

    const uuid = useUuid();

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
            >
                {children}
            </StyledCheckboxLabel>
        </StyledCheckbox>
    );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
