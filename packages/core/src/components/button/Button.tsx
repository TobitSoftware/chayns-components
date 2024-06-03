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
            return theme.text;
        }

        return theme.buttonColor ?? 'white';
    }, [isSecondary, theme.buttonColor, theme.text]);

    const backgroundColor = useMemo(() => {
        let color;

        if (isSecondary) {
            color = theme['202'];
        } else {
            color = theme.buttonBackgroundColor ?? theme['408'];
        }

        if (theme.buttonDesign === '2') {
            color = `rgba(${theme['102-rgb'] ?? ''}, 0)`;
        }

        return color;
    }, [isSecondary, theme]);

    const tapStyles = useMemo(() => {
        if (theme.buttonDesign === '2') {
            return {
                backgroundColor: `rgba(${theme['202-rgb'] ?? ''}, 0.7)`,
            };
        }

        return {
            opacity: 0.6,
        };
    }, [theme]);

    const hoverStyles = useMemo(() => {
        if (theme.buttonDesign === '2') {
            return {
                backgroundColor: `rgba(${theme['102-rgb'] ?? ''}, 0.5)`,
            };
        }

        return {
            opacity: 1,
        };
    }, [theme]);

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
            animate={{ backgroundColor }}
            whileTap={isDisabled ? {} : { ...tapStyles }}
            whileHover={isDisabled ? {} : { ...hoverStyles }}
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
                        <WaitCursor color={iconColor ?? 'white'} shouldHideBackground />
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
