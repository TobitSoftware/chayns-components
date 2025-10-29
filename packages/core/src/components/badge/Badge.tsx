import clsx from 'clsx';
import React, { FC, ReactNode, useRef, type CSSProperties, type MouseEventHandler } from 'react';
import { useElementSize } from '../../hooks/element';
import { StyledBadge } from './Badge.styles';
import { BadgeDesign, BadgeSize } from './Badge.types';

const BADGE_SIZES = {
    0: { font: '70%', padding: '0 6px' },
    1: { font: '80%', padding: '2px 8px 0 8px' },
};

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
     * The design of the Badge
     */
    design?: BadgeDesign;
    /**
     * The font color of the badge
     */
    fontColor?: CSSProperties['color'];
    /**
     * Function to be executed when the badge is clicked
     */
    onClick?: MouseEventHandler;
    /**
     * The size of the badge
     */
    size?: BadgeSize;
};

const Badge: FC<BadgeProps> = ({
    backgroundColor,
    children,
    className,
    fontColor,
    onClick,
    design = BadgeDesign.DEFAULT,
    size: badgeSize = BadgeSize.DEFAULT,
}) => {
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
            $design={design}
            $size={BADGE_SIZES[badgeSize]}
            $minWidth={minWidth}
        >
            {children || '​'}
        </StyledBadge>
    );
};

Badge.displayName = 'Badge';

export default Badge;
