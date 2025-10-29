import { MotionStyle, MotionValue, useTransform } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

export type UseThumbIconRes = {
    icon: string;
    styles: MotionStyle;
};
export const useThumbIcon = (x: MotionValue<number>, iconColor: string): UseThumbIconRes => {
    const [icon, setIcon] = useState('fas fa-arrow-right');
    const opacity = useTransform(x, [0, 5, 6, 200], [1, 0, 0, 1]);
    const styles = useMemo<MotionStyle>(
        () => ({
            opacity,
            color: iconColor,
        }),
        [iconColor, opacity],
    );

    useEffect(
        () =>
            x.on('change', (value) => {
                if (value > 5) {
                    setIcon('fas fa-check');
                } else {
                    setIcon('fas fa-arrow-right');
                }
            }),
        [x],
    );

    return useMemo(() => ({ icon, styles }), [icon, styles]);
};
