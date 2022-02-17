import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

export const useUuid = () => {
    const [uuid] = useState(uuidV4());

    return uuid;
};
