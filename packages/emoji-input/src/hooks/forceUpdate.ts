import { useState } from 'react';

export const useForceUpdate = () => {
    const [r, setR] = useState(0);
    return () => setR((r) => r + 1);
};
