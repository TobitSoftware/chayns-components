import React, { FC } from 'react';
import { Member } from '../../CommunicationHeader.types';
import { StyledHeaderMember } from './HeaderMember.styles';

const HeaderMember: FC<Member> = ({ name, id, actions }) => {
    const tet = 0;

    return <StyledHeaderMember>{name}</StyledHeaderMember>;
};

HeaderMember.displayName = 'HeaderMember';

export default HeaderMember;
