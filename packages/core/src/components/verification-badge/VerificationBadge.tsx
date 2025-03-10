import React from 'react';
import { StyledVerificationBadge } from './VerificationBadge.styles';

const VerificationBadge = () => {
    return (
        <StyledVerificationBadge className="vcid-check--blue">
            <span />
            <span />
            <span />
        </StyledVerificationBadge>
    );
};

VerificationBadge.displayName = 'VerificationBadge';

export default VerificationBadge;
