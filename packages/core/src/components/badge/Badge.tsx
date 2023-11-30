import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
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
};

//
const Badge: FC<BadgeProps> = ({ backgroundColor, children, className, fontColor }) => {
    const badgeClasses = clsx('beta-chayns-badge ellipsis', className);

    return (
        <StyledBadge
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
