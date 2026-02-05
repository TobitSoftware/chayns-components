import clsx from 'clsx';
import { AnimatePresence } from 'motion/react';
import React, { FC, MouseEventHandler, useMemo } from 'react';
import { useTheme } from 'styled-components';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';
import Icon from '../icon/Icon';
import {
    StyledIconWrapper,
    StyledMotionButton,
    StyledMotionChildrenWrapper,
    StyledMotionWaitCursorWrapper,
} from './Button.styles';
import type { ButtonProps } from './Button.types';
import WaitCursor from './wait-cursor/WaitCursor';

const Button: FC<ButtonProps> = ({
    children,
    className,
    icon,
    isDisabled,
    isSecondary,
    onClick,
    shouldShowWaitCursor,
    shouldStopPropagation,
    shouldShowAsSelectButton = false,
    shouldShowTextAsRobotoMedium = true,
    buttonDesign,
}) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (shouldStopPropagation) {
            event.stopPropagation();
        }

        onClick(event);
    };

    const buttonClasses = clsx('beta-chayns-button ellipsis', className);

    const theme = useTheme() as Theme;

    const effectiveButtonDesign = (buttonDesign ?? theme.buttonDesign) as number;

    const iconColor = useMemo(() => {
        if (isSecondary) {
            return theme.text;
        }

        return effectiveButtonDesign === 2
            ? (theme.buttonColor ?? theme.buttonBackgroundColor ?? 'white')
            : (theme.buttonColor ?? 'white');
    }, [
        isSecondary,
        theme.buttonBackgroundColor,
        theme.buttonColor,
        effectiveButtonDesign,
        theme.text,
    ]);

    const backgroundColor = useMemo(() => {
        let color;

        if (isSecondary || shouldShowAsSelectButton) {
            color = theme['202'];
        } else {
            color = theme.buttonBackgroundColor ?? theme['408'];
        }

        if (effectiveButtonDesign === 2) {
            color = `rgba(${theme['102-rgb'] ?? ''}, 0)`;
        }

        return color;
    }, [isSecondary, shouldShowAsSelectButton, theme, effectiveButtonDesign]);

    const tapStyles = useMemo(() => {
        if (effectiveButtonDesign === 2) {
            return {
                backgroundColor:
                    isSecondary || shouldShowAsSelectButton
                        ? `rgba(${theme['202-rgb'] ?? ''}, 0.7)`
                        : `${theme.buttonBackgroundColor ?? ''}40`,
            };
        }

        return { opacity: 0.6 };
    }, [isSecondary, shouldShowAsSelectButton, theme, effectiveButtonDesign]);

    const hoverStyles = useMemo(() => {
        if (effectiveButtonDesign === 2) {
            return { backgroundColor: `rgba(${theme['102-rgb'] ?? ''}, 0.5)` };
        }

        return { opacity: 1 };
    }, [theme, effectiveButtonDesign]);

    return (
        <StyledMotionButton
            $shouldShowTextAsRobotoMedium={shouldShowTextAsRobotoMedium}
            $shouldShowAsSelectButton={shouldShowAsSelectButton}
            $shouldShowWaitCursor={shouldShowWaitCursor}
            className={buttonClasses}
            disabled={isDisabled}
            $isDisabled={isDisabled}
            $hasChildren={!!children}
            $hasIcon={typeof icon === 'string' && icon !== ''}
            $isSecondary={isSecondary}
            $effectiveButtonDesign={effectiveButtonDesign}
            onClick={handleClick}
            style={{ visibility: !backgroundColor ? 'hidden' : 'visible', backgroundColor }}
            initial={{ opacity: 0.5 }}
            animate={{
                opacity: isDisabled ? 0.5 : 1,
            }}
            transition={{ visibility: { duration: 0 } }}
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
