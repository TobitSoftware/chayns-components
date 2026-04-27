import React, { FC, ReactNode, useMemo, useState } from 'react';
import { HeaderMembersProps } from './HeaderMembers.types';
import {
    StyledHeaderMembers,
    StyledHeaderMembersDate,
    StyledHeaderMembersFirstMember,
    StyledMotionIcon,
    StyledHeaderMembersIconWrapper,
    StyledHeaderMembersContent,
} from './HeaderMembers.styles';
import { useCommunicationHeaderDate } from './HeaderMembers.hooks';
import HeaderMember from './header-member/HeaderMember';
import { ExpandableContent, Icon, Skeleton } from '@chayns-components/core';

interface Row {
    prefix: ReactNode;
    content: ReactNode;
}

const HeaderMembers: FC<HeaderMembersProps> = ({ from, to, date, cc, isLoading }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formattedDate = useCommunicationHeaderDate(date);

    // ToDo add textstrings
    const rows = useMemo(() => {
        const items: Row[] = [];

        to?.forEach((member, index) => {
            items.push({
                prefix: index === 0 ? <div>An</div> : <div />,
                content: (
                    <HeaderMember actions={member.actions} id={member.id} name={member.name} />
                ),
            });
        });

        cc?.forEach((member, index) => {
            items.push({
                prefix: index === 0 ? <div>CC</div> : <div />,
                content: (
                    <HeaderMember actions={member.actions} id={member.id} name={member.name} />
                ),
            });
        });

        return items;
    }, [cc, to]);

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
            <ExpandableContent isOpen={isOpen}>
                <StyledHeaderMembersContent className="chayns-scrollbar">
                    {rows.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.prefix}

                            {row.content}
                        </React.Fragment>
                    ))}
                </StyledHeaderMembersContent>
            </ExpandableContent>
        </StyledHeaderMembers>
    );
};

HeaderMembers.displayName = 'HeaderMembers';

export default HeaderMembers;
