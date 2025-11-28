import { useEffect, useState } from 'react';

export const useIsTouch = () => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch(!matchMedia('(pointer:fine)').matches);
    }, []);

    return isTouch;
};
