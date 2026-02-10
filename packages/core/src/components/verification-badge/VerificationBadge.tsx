import React from 'react';
import { StyledVerificationBadge } from './VerificationBadge.styles';

const VerificationBadge = () => (
    <StyledVerificationBadge className="beta-chayns-verification-badge">
        <span>{'\ue903'}</span>
        <span>{'\ue904'}</span>
        <span>{'\ue905'}</span>
    </StyledVerificationBadge>
);

VerificationBadge.displayName = 'VerificationBadge';

export default VerificationBadge;
