import clsx from 'clsx';
import React, { FC, MouseEventHandler, ReactNode } from 'react';
import Icon from '../icon/Icon';
import { StyledButton, StyledIconWrapper } from './Button.styles';

export type ButtonProps = {
    /**
     * The label of the button
     */
    children: ReactNode;
    /**
     * Additional class names for the button element
     */
    className?: string;
    /**
     * An icon that is displayed on the left-hand side of the button text
     */
    icon?: string;
    /**
     * Disables the button so that it cannot be clicked anymore
     */
    isDisabled?: boolean;
    /**
     * Displays the button in the secondary style
     */
    isSecondary?: boolean;
    /**
     * Function to be executed when the button is clicked
     */
    onClick: MouseEventHandler<HTMLButtonElement>;
    /**
     * Stops event propagation on click
     */
    shouldStopPropagation?: boolean;
};

const Button: FC<ButtonProps> = ({
    children,
    className,
    icon,
    isDisabled,
    isSecondary,
    onClick,
    shouldStopPropagation,
}) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (shouldStopPropagation) {
            event.stopPropagation();
        }

        onClick(event);
    };

    const buttonClasses = clsx('beta-chayns-button ellipsis', className);

    return (
        <StyledButton
            className={buttonClasses}
            disabled={isDisabled}
            hasIcon={typeof icon === 'string' && icon !== ''}
            isSecondary={isSecondary}
            onClick={handleClick}
        >
            <>
                {icon && (
                    <StyledIconWrapper>
                        <Icon color="white" icons={[icon]} />
                    </StyledIconWrapper>
                )}
                {children}
            </>
        </StyledButton>
    );
};

Button.displayName = 'Button';

export default Button;
