import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { MentionFinderPopupAlignment } from './constants/alignment';
import MentionFinderItem from './mention-finder-item/MentionFinderItem';
import { StyledMentionFinder, StyledMotionMentionFinderPopup } from './MentionFinder.styles';

export type MentionMember = {
    id: string;
    info: string;
    imageUrl: string;
    name: string;
};

export type MentionFinderProps = {
    /**
     * The text from the input field
     */
    inputValue: string;
    /**
     * Members that can be selected
     */
    members: MentionMember[];
    /**
     * Function to be executed when a member is selected
     */
    onSelect: ({ fullMatch, member }: { fullMatch: string; member: MentionMember }) => void;
    /**
     * Alignment of the popup
     */
    popupAlignment: MentionFinderPopupAlignment;
};

const MentionFinder: FC<MentionFinderProps> = ({
    inputValue,
    members,
    onSelect,
    popupAlignment,
}) => {
    const [activeMember, setActiveMember] = useState(members[0]);

    const [fullMatch, searchString] = useMemo(() => {
        const regExpMatchArray = inputValue.match(/@(\w*)/);

        return [regExpMatchArray?.[0], regExpMatchArray?.[1]?.toLowerCase() ?? ''];
    }, [inputValue]);

    const filteredMembers = useMemo(
        () =>
            searchString !== ''
                ? members.filter(
                      ({ id, info, name }) =>
                          id.toLowerCase().includes(searchString) ||
                          info.toLowerCase().includes(searchString) ||
                          name.toLowerCase().includes(searchString)
                  )
                : members,
        [members, searchString]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            let shouldPreventDefault = false;

            if (event.key === 'ArrowUp') {
                const currentIndex = filteredMembers.findIndex(({ id }) => id === activeMember?.id);

                const prevIndex = Math.max(currentIndex - 1, 0);

                const member = filteredMembers[prevIndex];

                setActiveMember(member);

                shouldPreventDefault = true;
            } else if (event.key === 'ArrowDown') {
                const currentIndex = filteredMembers.findIndex(({ id }) => id === activeMember?.id);

                const nextIndex = Math.min(currentIndex + 1, filteredMembers.length - 1);

                const member = filteredMembers[nextIndex];

                setActiveMember(member);

                shouldPreventDefault = true;
            } else if (event.key === 'Enter') {
                if (fullMatch && activeMember) {
                    onSelect({ fullMatch, member: activeMember });

                    shouldPreventDefault = true;
                }
            }

            if (shouldPreventDefault) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        [activeMember, filteredMembers, fullMatch, onSelect]
    );

    const handleMemberClick = useCallback(
        (member: MentionMember) => {
            if (fullMatch) {
                onSelect({ fullMatch, member });
            }
        },
        [fullMatch, onSelect]
    );

    const handleMemberHover = useCallback((member: MentionMember) => {
        setActiveMember(member);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (filteredMembers.length > 0) {
            const isActiveMemberShown = filteredMembers.some(({ id }) => id === activeMember?.id);

            if (!isActiveMemberShown) {
                setActiveMember(filteredMembers[0]);
            }
        }
    }, [activeMember?.id, filteredMembers]);

    const items = useMemo(
        () =>
            filteredMembers.map((member) => (
                <MentionFinderItem
                    isActive={member.id === activeMember?.id}
                    key={member.id}
                    member={member}
                    onClick={handleMemberClick}
                    onHover={handleMemberHover}
                />
            )),
        [activeMember, filteredMembers, handleMemberClick, handleMemberHover]
    );

    const exitAndInitialY = popupAlignment === MentionFinderPopupAlignment.Bottom ? 16 : -16;

    return (
        <StyledMentionFinder className="beta-chayns-mention-finder">
            <AnimatePresence initial={false}>
                {fullMatch && items.length > 0 && (
                    <StyledMotionMentionFinderPopup
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: exitAndInitialY }}
                        initial={{ opacity: 0, y: exitAndInitialY }}
                        popupAlignment={popupAlignment}
                    >
                        {items}
                    </StyledMotionMentionFinderPopup>
                )}
            </AnimatePresence>
        </StyledMentionFinder>
    );
};

MentionFinder.displayName = 'MentionFinder';

export default MentionFinder;
