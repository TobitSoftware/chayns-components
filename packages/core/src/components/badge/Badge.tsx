import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { StyledBadge } from './Badge.styles';

type BadgeProps = {
    /**
     * The content of the badge
     */
    children: ReactNode;
    /**
     * Additional class names for the badge element
     */
    className?: string;
};

const Badge: FC<BadgeProps> = ({ children, className }) => {
    const badgeClasses = clsx('beta-chayns-badge ellipsis', className);

    return <StyledBadge className={badgeClasses}>{children}</StyledBadge>;
};

Badge.displayName = 'Badge';

export default Badge;
