import clsx from 'clsx';
import React, { FC, MouseEventHandler } from 'react';
import { getStackSizeFactor } from '../../utils/icon';
import { StyledIcon, StyledIconWrapper } from './Icon.styles';
import { useTheme } from 'styled-components';
import type { Theme } from '../color-scheme-provider/ColorSchemeProvider';

export type IconProps = {
    /**
     * Additional class name for the icon wrapper element.
     * @description
     * This class name is applied to the wrapper element that contains the icon. It can be used to
     * style the icon wrapper element.
     * @example
     * <Icon className="my-custom-class" icons={['fa-user']} />
     * @optional
     */
    className?: string;
    /**
     * The color of the icon.
     * @description
     * This property can be used to set the color of the icon. The color is only used for icons that
     * don't have a predefined color (e.g., 'fa-inverse' icons will always be white). If no color is
     * specified, the icon color of the theme or the text color will be used.
     * @example
     * <Icon color="red" icons={['fa-user']} />
     * @optional
     */
    color?: string;
    /**
     * The icon(s) to be displayed.
     * @description
     * This property can be used to set the icon(s) to be displayed. The icon(s) must be specified as
     * an array of strings. Each string must be a valid icon name.
     * @example
     * <Icon icons={['fa-user']} />
     * <Icon icons={['fa fa-circle fa-stack-2x', 'fa fa-french-fries fa-inverse']} />
     */
    icons: string[];
    /**
     * Whether the icon should be disabled.
     * @description
     * This property can be used to disable the icon. When the icon is disabled, it will not be
     * clickable, and it will not emit any events.
     * @example
     * <Icon icons={['fa-user']} isDisabled />
     * @optional
     */
    isDisabled?: boolean;
    /**
     * Function to be executed when the icon is clicked.
     * @description
     * This function is executed when the icon is clicked. It can be used to handle the click event.
     * @example
     * <Icon icons={['fa-user']} onClick={() => console.log('Icon clicked')} />
     * @optional
     */
    onClick?: MouseEventHandler<HTMLSpanElement>;
    /**
     * Function to be executed when the icon is double-clicked.
     * @description
     * This function is executed when the icon is double-clicked. It can be used to handle the
     * double-click event.
     * @example
     * <Icon icons={['fa-user']} onDoubleClick={() => console.log('Icon double-clicked')} />
     * @optional
     */
    onDoubleClick?: MouseEventHandler<HTMLSpanElement>;
    /**
     * Function to be executed when the icon is pressed.
     * @description
     * This function is executed when the icon is pressed. It can be used to handle the mouse down event.
     * @example
     * <Icon icons={['fa-user']} onMouseDown={() => console.log('Icon pressed')} />
     * @optional
     */
    onMouseDown?: MouseEventHandler<HTMLSpanElement>;
    /**
     * The size of the icon.
     * @description
     * This property can be used to set the size of the icon. The size must be specified as a number
     * in pixels.
     * @default 15
     * @example
     * <Icon icons={['fa-user']} size={20} />
     * @optional
     */
    size?: number;
    /**
     * Stops event propagation on click.
     * @description
     * This property can be used to prevent the icon from propagating the click event to its parent
     * elements.
     * @example
     * <Icon icons={['fa-user']} shouldStopPropagation />
     * @optional
     */
    shouldStopPropagation?: boolean;
    /**
     * Optional tab index for the icon.
     */
    tabIndex?: number;
};

const Icon: FC<IconProps> = ({
    className,
    color,
    icons,
    isDisabled,
    onClick,
    onDoubleClick,
    onMouseDown,
    tabIndex,
    size = 15,
    shouldStopPropagation,
}) => {
    const theme = useTheme() as Theme;

    const handleClick: MouseEventHandler<HTMLSpanElement> = (event) => {
        if (shouldStopPropagation) {
            event.stopPropagation();
        }

        if (typeof onClick === 'function') {
            onClick(event);
        }
    };

    const handleDoubleClick: MouseEventHandler<HTMLSpanElement> = (event) => {
        if (shouldStopPropagation) {
            event.stopPropagation();
        }

        if (typeof onDoubleClick === 'function') {
            onDoubleClick(event);
        }
    };

    let maxStackSizeFactor = 1;

    icons.forEach((icon) => {
        const stackSizeFactor = getStackSizeFactor(icon);

        if (stackSizeFactor && stackSizeFactor > maxStackSizeFactor) {
            maxStackSizeFactor = stackSizeFactor;
        }
    });

    const shouldUseStackedIcon = icons.length > 1;

    const wrapperClasses = clsx(
        'beta-chayns-icon',
        shouldUseStackedIcon ? 'fa-stack' : '',
        className,
    );

    return (
        <StyledIconWrapper
            tabIndex={tabIndex}
            className={wrapperClasses}
            $isDisabled={isDisabled}
            onClick={typeof onClick === 'function' && !isDisabled ? handleClick : undefined}
            $isOnClick={typeof onClick === 'function' && !isDisabled}
            onDoubleClick={
                typeof onDoubleClick === 'function' && !isDisabled ? handleDoubleClick : undefined
            }
            onMouseDown={typeof onMouseDown === 'function' && !isDisabled ? onMouseDown : undefined}
            $size={size}
        >
            {icons.map((icon) => {
                const stackSizeFactor = getStackSizeFactor(icon);

                const iconStyle = `${(theme?.iconStyle as string) ?? 'fa-regular'} `;
                const themedIcon = icon?.replace(/^fa\s/, iconStyle);

                const iconClasses = clsx(themedIcon, {
                    'fa-stack-1x': shouldUseStackedIcon && stackSizeFactor === undefined,
                });

                return (
                    <StyledIcon
                        className={iconClasses}
                        $color={icon.includes('fa-inverse') ? 'white' : color}
                        $fontSize={((stackSizeFactor || 1) / maxStackSizeFactor) * size}
                        $isStacked={shouldUseStackedIcon}
                        key={icon}
                        $size={size}
                    />
                );
            })}
        </StyledIconWrapper>
    );
};

Icon.displayName = 'Icon';

export default Icon;
