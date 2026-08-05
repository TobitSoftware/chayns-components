import React, { FC, ReactNode, useMemo, useRef, useState } from 'react';
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
import {
    ExpandableContent,
    Icon,
    Skeleton,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
} from '@chayns-components/core';
import { Translation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';

interface Row {
    prefix: ReactNode;
    content: ReactNode;
}

const HeaderMembers: FC<HeaderMembersProps> = ({
    from,
    to,
    date,
    cc,
    isLoading,
    shouldEnableKeyboardHighlighting,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(toggleRef, { isEnabled: shouldShowKeyboardHighlighting });

    const formattedDate = useCommunicationHeaderDate(date);

    const rows = useMemo(() => {
        const items: Row[] = [];

        to?.forEach((member, index) => {
            items.push({
                prefix:
                    index === 0 ? (
                        <Translation
                            textString={textStrings.communicationHeader.headerMembers.to}
                        />
                    ) : (
                        <div />
                    ),
                content: (
                    <HeaderMember
                        actions={member.actions}
                        name={member.name}
                        isFocusable={isOpen}
                        shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                    />
                ),
            });
        });

        cc?.forEach((member, index) => {
            items.push({
                prefix:
                    index === 0 ? (
                        <Translation
                            textString={textStrings.communicationHeader.headerMembers.cc}
                        />
                    ) : (
                        <div />
                    ),
                content: (
                    <HeaderMember
                        actions={member.actions}
                        name={member.name}
                        isFocusable={isOpen}
                        shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                    />
                ),
            });
        });

        return items;
    }, [cc, isOpen, shouldEnableKeyboardHighlighting, to]);

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
                <HeaderMember
                    actions={from.actions}
                    name={from.name}
                    shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                />
                <StyledHeaderMembersDate>{formattedDate}</StyledHeaderMembersDate>
                <StyledHeaderMembersIconWrapper
                    aria-expanded={isOpen}
                    aria-label={isOpen ? 'Hide recipients' : 'Show recipients'}
                    onClick={() => setIsOpen((prev) => !prev)}
                    ref={toggleRef}
                    type="button"
                >
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
                    {isOpen &&
                        rows.map((row, i) => (
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
