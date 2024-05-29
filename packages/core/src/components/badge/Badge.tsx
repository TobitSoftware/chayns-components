import clsx from 'clsx';
import React, { FC, ReactNode, useRef, type CSSProperties, type MouseEventHandler } from 'react';
import { useElementSize } from '../../hooks/useElementSize';
import { StyledBadge } from './Badge.styles';

export type BadgeProps = {
    /**
     * The background color of the badge
     */
    backgroundColor?: CSSProperties['backgroundColor'];
    /**
     * The content of the badge
     */
    children?: ReactNode;
    /**
     * Additional class names for the badge element
     */
    className?: string;
    /**
     * The font color of the badge
     */
    fontColor?: CSSProperties['color'];
    /**
     * Function to be executed when the badge is clicked
     */
    onClick?: MouseEventHandler;
};

const Badge: FC<BadgeProps> = ({ backgroundColor, children, className, fontColor, onClick }) => {
    const badgeClasses = clsx('beta-chayns-badge ellipsis', className);

    const badgeRef = useRef<HTMLDivElement>(null);

    const size = useElementSize(badgeRef);

    // Add 4px to the height to account for the padding
    const borderRadius = size ? `${(size.height + 4) / 2}px` : '15px';
    const minWidth = size ? `${size.height + 4}px` : '1.65rem';

    return (
        <StyledBadge
            className={badgeClasses}
            onClick={onClick}
            ref={badgeRef}
            $backgroundColor={backgroundColor}
            $borderRadius={borderRadius}
            $cursor={typeof onClick === 'function' ? 'pointer' : 'default'}
            $fontColor={fontColor}
            $minWidth={minWidth}
        >
            {children || '​'}
        </StyledBadge>
    );
};

Badge.displayName = 'Badge';

export default Badge;
