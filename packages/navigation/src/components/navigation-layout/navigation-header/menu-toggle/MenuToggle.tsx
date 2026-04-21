import React, { FC, SVGAttributes } from 'react';
import { motion, MotionConfig, Variants } from 'motion/react';
import { StyledMotionMenuToggle } from './MenuToggle.styles';

interface PathProps {
    d?: SVGAttributes<unknown>['d'];
    variants: Variants;
}

const Path: FC<PathProps> = ({ d, variants }) => (
    <motion.path d={d} strokeLinecap="round" strokeWidth="3" variants={variants} />
);

interface MenuToggleProps {
    isOpen: boolean;
    onClick: () => void;
    color: string;
}

const MenuToggle: FC<MenuToggleProps> = ({ isOpen, onClick, color }) => (
    <StyledMotionMenuToggle animate={isOpen ? 'open' : 'closed'} onClick={onClick} type="button">
        <MotionConfig transition={{ duration: 0.3, type: 'tween' }}>
            <svg width="22" height="22" viewBox="0 0 23 23" stroke={color}>
                <Path
                    variants={{
                        closed: { d: 'M 2 2.5 L 20 2.5' },
                        open: { d: 'M 3 16.5 L 17 2.5' },
                    }}
                />
                <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                        closed: { opacity: 1, scale: 1 },
                        open: { opacity: 0, scale: 0 },
                    }}
                />
                <Path
                    variants={{
                        closed: { d: 'M 2 16.346 L 20 16.346' },
                        open: { d: 'M 3 2.5 L 17 16.346' },
                    }}
                />
            </svg>
        </MotionConfig>
    </StyledMotionMenuToggle>
);

MenuToggle.displayName = 'MenuToggle';

export default MenuToggle;
