import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useUuid } from '../../hooks/uuid';
import { getHeightOfSingleTextLine } from '../../utils/calculate';
import {
    StyledCheckbox,
    StyledCheckboxBox,
    StyledCheckboxBoxWrapper,
    StyledCheckboxInput,
    StyledCheckboxLabel,
} from './Checkbox.styles';

export type CheckboxProps = {
    /**
     * Text for checkbox or switch
     */
    children?: ReactElement | string;
    /**
     * Indicates whether the checkbox or switch is selected
     */
    isChecked?: boolean;
    /**
     * Disables the checkbox or switch so it cannot be toggled
     */
    isDisabled?: boolean;
    /**
     * Classname for the label
     */
    labelClassName?: string;
    /**
     * Function to be executed if the checked value changes
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Whether the label should change the state of the checkbox
     */
    shouldChangeOnLabelClick?: boolean;
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
    labelClassName,
    onChange,
    shouldShowAsSwitch,
    shouldShowCentered = true,
    shouldChangeOnLabelClick = true,
}) => {
    const [isActive, setIsActive] = useState(isChecked ?? false);
    const [checkboxTop, setCheckboxTop] = useState<number | undefined>(undefined);

    const checkboxBoxRef = useRef<HTMLLabelElement>(null);
    const checkboxRootRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (checkboxRootRef.current && !shouldShowCentered) {
            const singleLineHeight = getHeightOfSingleTextLine({
                container: checkboxRootRef.current,
            });

            const boxHeight = checkboxBoxRef.current?.getBoundingClientRect().height ?? 0;

            setCheckboxTop((singleLineHeight - boxHeight) / 2);
        }
    }, [shouldShowCentered]);

    return (
        <StyledCheckbox ref={checkboxRootRef}>
            <StyledCheckboxInput
                checked={isChecked}
                disabled={isDisabled}
                id={uuid}
                onChange={handleChange}
                type="checkbox"
            />
            <StyledCheckboxBoxWrapper
                style={{
                    top: shouldShowCentered ? '50%' : checkboxTop,
                    transform: shouldShowCentered ? 'translateY(-50%)' : undefined,
                }}
            >
                <StyledCheckboxBox
                    htmlFor={uuid}
                    ref={checkboxBoxRef}
                    $isChecked={isChecked ?? isActive}
                    $isDisabled={isDisabled}
                    $shouldShowAsSwitch={shouldShowAsSwitch}
                />
            </StyledCheckboxBoxWrapper>
            <StyledCheckboxLabel
                className={labelClassName}
                $isDisabled={isDisabled}
                $shouldChangeOnLabelClick={shouldChangeOnLabelClick}
                $shouldShowAsSwitch={shouldShowAsSwitch}
                htmlFor={shouldChangeOnLabelClick ? uuid : undefined}
            >
                {children}
            </StyledCheckboxLabel>
        </StyledCheckbox>
    );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
