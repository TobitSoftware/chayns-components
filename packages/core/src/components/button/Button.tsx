import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import React, { FC, MouseEventHandler, ReactNode, useMemo } from 'react';
import { useTheme } from 'styled-components';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import Icon from '../icon/Icon';
import {
    StyledIconWrapper,
    StyledMotionButton,
    StyledMotionChildrenWrapper,
    StyledMotionWaitCursorWrapper,
} from './Button.styles';
import WaitCursor from './wait-cursor/WaitCursor';

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
     * Whether the text should be 'Roboto Medium'
     */
    ShouldShowTextAsRobotoMedium?: boolean;
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
    ShouldShowTextAsRobotoMedium = true,
}) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (shouldStopPropagation) {
            event.stopPropagation();
        }

        onClick(event);
    };

    const buttonClasses = clsx('beta-chayns-button ellipsis', className);

    const theme: Theme = useTheme();

    const iconColor = useMemo(() => {
        if (isSecondary) {
            return theme.buttonColorBackground ?? theme.text;
        }

        return theme.buttonColor ?? 'white';
    }, [isSecondary, theme.buttonColor, theme.buttonColorBackground, theme.text]);

    return (
        <StyledMotionButton
            $ShouldShowTextAsRobotoMedium={ShouldShowTextAsRobotoMedium}
            className={buttonClasses}
            disabled={isDisabled}
            $isDisabled={isDisabled}
            $hasChildren={!!children}
            $hasIcon={typeof icon === 'string' && icon !== ''}
            $isSecondary={isSecondary}
            onClick={handleClick}
            whileTap={
                isDisabled ? {} : { backgroundColor: isSecondary ? theme['201'] : theme['407'] }
            }
            whileHover={
                isDisabled ? {} : { backgroundColor: isSecondary ? theme['203'] : theme['409'] }
            }
        >
            <AnimatePresence initial={false}>
                {icon && (
                    <StyledIconWrapper>
                        <Icon color={iconColor} icons={[icon]} />
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
                        <WaitCursor shouldHideBackground />
                    </StyledMotionWaitCursorWrapper>
                )}
                {!shouldShowWaitCursor && children && (
                    <StyledMotionChildrenWrapper
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        initial={{ opacity: 0, width: 0 }}
                        key="children"
                        // style={{ overflow: 'hidden' }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </StyledMotionChildrenWrapper>
                )}
            </AnimatePresence>
        </StyledMotionButton>
    );
};

Button.displayName = 'Button';

export default Button;
