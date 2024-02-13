import clsx from 'clsx';
import React, { FC, type MouseEventHandler, ReactNode } from 'react';
import { StyledBadge } from './Badge.styles';

export type BadgeProps = {
    /**
     * The background color of the badge
     */
    backgroundColor?: string;
    /**
     * The content of the badge
     */
    children: ReactNode;
    /**
     * Additional class names for the badge element
     */
    className?: string;
    /**
     * The font color of the badge
     */
    fontColor?: string;
    /**
     * Function to be executed when the badge is clicked
     */
    onClick?: MouseEventHandler;
};

const Badge: FC<BadgeProps> = ({ backgroundColor, children, className, fontColor, onClick }) => {
    const badgeClasses = clsx('beta-chayns-badge ellipsis', className);

    return (
        <StyledBadge
            onClick={onClick}
            isOnClick={typeof onClick === 'function'}
            backgroundColor={backgroundColor}
            className={badgeClasses}
            fontColor={fontColor}
        >
            {children}
        </StyledBadge>
    );
};

Badge.displayName = 'Badge';

export default Badge;
