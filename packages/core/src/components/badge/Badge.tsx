import clsx from 'clsx';
import React, { FC, useRef } from 'react';
import { useElementSize } from '../../hooks/element';
import { BADGE_SIZES } from './Badge.constants';
import { StyledBadge } from './Badge.styles';
import { BadgeProps, BadgeDesign, BadgeSize } from './Badge.types';

const Badge: FC<BadgeProps> = ({
    backgroundColor,
    children,
    className,
    fontColor,
    onClick,
    design = BadgeDesign.DEFAULT,
    size = BadgeSize.DEFAULT,
}) => {
    const badgeClasses = clsx('beta-chayns-badge ellipsis', className);

    const badgeRef = useRef<HTMLDivElement>(null);

    const elementSize = useElementSize(badgeRef);

    // Add 4px to the height to account for the padding
    const borderRadius = elementSize ? `${(elementSize.height + 4) / 2}px` : '15px';
    const minWidth = elementSize ? `${elementSize.height + 4}px` : '1.65rem';

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
            $size={BADGE_SIZES[size]}
            $minWidth={minWidth}
        >
            {children || '​'}
        </StyledBadge>
    );
};

Badge.displayName = 'Badge';

export default Badge;
