import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import React, { FC, MouseEventHandler, ReactNode } from 'react';
import Icon from '../icon/Icon';
import SmallWaitCursor, { SmallWaitCursorSize } from '../small-wait-cursor/SmallWaitCursor';
import {
    StyledButton,
    StyledIconWrapper,
    StyledMotionChildrenWrapper,
    StyledMotionWaitCursorWrapper,
} from './Button.styles';

export type ButtonProps = {
    /**
     * The label of the button
     */
    children?: ReactNode;
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
     * Shows a wait cursor instead of button text
     */
    shouldShowWaitCursor?: boolean;
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
    shouldShowWaitCursor,
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
            hasChildren={!!children}
            hasIcon={typeof icon === 'string' && icon !== ''}
            isSecondary={isSecondary}
            onClick={handleClick}
        >
            <AnimatePresence initial={false}>
                {icon && (
                    <StyledIconWrapper>
                        <Icon color="white" icons={[icon]} />
                    </StyledIconWrapper>
                )}
                {shouldShowWaitCursor && (
                    <StyledMotionWaitCursorWrapper
                        animate={{ opacity: 1, width: 40 }}
                        exit={{ opacity: 0, width: 0 }}
                        initial={{ opacity: 0, width: 0 }}
                        key="wait-cursor"
                        style={{ overflow: 'hidden' }}
                        transition={{ duration: 0.2 }}
                    >
                        <SmallWaitCursor
                            color="white"
                            shouldHideBackground
                            size={SmallWaitCursorSize.Small}
                        />
                    </StyledMotionWaitCursorWrapper>
                )}
                {!shouldShowWaitCursor && children && (
                    <StyledMotionChildrenWrapper
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        initial={{ opacity: 0, width: 0 }}
                        key="children"
                        style={{ overflow: 'hidden' }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </StyledMotionChildrenWrapper>
                )}
            </AnimatePresence>
        </StyledButton>
    );
};

Button.displayName = 'Button';

export default Button;
