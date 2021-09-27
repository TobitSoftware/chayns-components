import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import clsx from 'clsx';

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

const StyledBadge = styled.div`
    background-color: ${({ theme }) => theme['secondary-202']};
    border-radius: 15px;
    color: ${({ theme }) => theme['007']};
    font-size: 0.8rem;
    padding: 2px 7px;
    text-align: center;
`;

const Badge: FC<BadgeProps> = ({ children, className }) => {
    const badgeClasses = clsx('beta-chayns-badge ellipsis', className);

    return <StyledBadge className={badgeClasses}>{children}</StyledBadge>;
};

Badge.displayName = 'Badge';

export default Badge;
