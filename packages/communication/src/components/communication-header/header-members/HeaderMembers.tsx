import React, { FC, useState } from 'react';
import { HeaderMembersProps } from './HeaderMembers.types';
import {
    StyledHeaderMembers,
    StyledHeaderMembersDate,
    StyledHeaderMembersFirstMember,
    StyledMotionIcon,
    StyledHeaderMembersIconWrapper,
} from './HeaderMembers.styles';
import { useCommunicationHeaderDate } from './HeaderMembers.hooks';
import HeaderMember from './header-member/HeaderMember';
import { Icon, Skeleton } from '@chayns-components/core';

const HeaderMembers: FC<HeaderMembersProps> = ({ from, to, date, cc, isLoading }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formattedDate = useCommunicationHeaderDate(date);

    if (isLoading) {
        return (
            <StyledHeaderMembers $isLoading={isLoading}>
                <StyledHeaderMembersFirstMember>
                    <Skeleton.Text width={120} />
                    <Skeleton.Text width={80} />
                    <Skeleton.Text width={27} />
                </StyledHeaderMembersFirstMember>
            </StyledHeaderMembers>
        );
    }

    return (
        <StyledHeaderMembers>
            <StyledHeaderMembersFirstMember>
                <HeaderMember actions={from.actions} id={from.id} name={from.name} />
                <StyledHeaderMembersDate>{formattedDate}</StyledHeaderMembersDate>
                <StyledHeaderMembersIconWrapper onClick={() => setIsOpen((prev) => !prev)}>
                    <StyledMotionIcon
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Icon icons={['fa fa-chevron-down']} />
                    </StyledMotionIcon>
                </StyledHeaderMembersIconWrapper>
            </StyledHeaderMembersFirstMember>
        </StyledHeaderMembers>
    );
};

HeaderMembers.displayName = 'HeaderMembers';

export default HeaderMembers;
