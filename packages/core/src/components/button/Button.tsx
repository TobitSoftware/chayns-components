import clsx from 'clsx';
import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

type ButtonProps = {
    /**
     * The label of the button
     */
    children: JSX.Element;
    /**
     * Additional class names for the button element
     */
    className?: string;
    /**
     * An icon that is displayed on the left hand side of the button text
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

const StyledButton = styled.button<ButtonProps>`
    background-color: ${({ isSecondary, theme }) => (isSecondary ? theme['202'] : theme['408'])};
    border-radius: 3px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    border: none;
    color: ${({ isSecondary, theme }) => (isSecondary ? theme['text'] : 'white')};
    cursor: pointer;
    display: inline-block;
    line-height: 1.15;
    min-height: 30px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    padding: 7px 12px;
    user-select: none;
    transition: opacity 0.3s ease;
`;

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
            isSecondary={isSecondary}
            onClick={handleClick}
        >
            {children}
        </StyledButton>
    );
};

Button.displayName = 'Button';

export default Button;
