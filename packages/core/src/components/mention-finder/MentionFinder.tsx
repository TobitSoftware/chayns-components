import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MentionFinderPopupAlignment } from '../../constants/mentionFinder';
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
    const [focusedIndex, setFocusedIndex] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    const [fullMatch, searchString] = useMemo(() => {
        // eslint-disable-next-line no-irregular-whitespace
        const regExpMatchArray = inputValue.match(/@([^\s​]*)/);

        return [regExpMatchArray?.[0], regExpMatchArray?.[1]?.toLowerCase() ?? ''];
    }, [inputValue]);

    const filteredMembers = useMemo(
        () =>
            searchString !== ''
                ? members.filter(
                      ({ id, info, name }) =>
                          id.toLowerCase().includes(searchString) ||
                          info.replace('chayns', '').toLowerCase().includes(searchString) ||
                          name.toLowerCase().includes(searchString),
                  )
                : members,
        [members, searchString],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();

                const children = ref.current?.children;

                if (children && children.length > 0) {
                    const newIndex =
                        focusedIndex !== null
                            ? (focusedIndex +
                                  (event.key === 'ArrowUp' ? -1 : 1) +
                                  children.length) %
                              children.length
                            : 0;

                    if (focusedIndex !== null) {
                        const prevElement = children[focusedIndex] as HTMLDivElement;
                        prevElement.tabIndex = -1;
                    }

                    setFocusedIndex(newIndex);

                    const member = filteredMembers[newIndex];

                    setActiveMember(member);

                    const newElement = children[newIndex] as HTMLDivElement;
                    newElement.tabIndex = 0;
                    newElement.focus();
                }
            } else if (event.key === 'Enter') {
                event.preventDefault();
                event.stopPropagation();

                if (fullMatch && activeMember) {
                    onSelect({ fullMatch, member: activeMember });
                }
            }

            // if (event.key === 'ArrowUp') {
            //     event.preventDefault();
            //     event.stopPropagation();
            //
            //     const currentIndex = filteredMembers.findIndex(({ id }) => id === activeMember?.id);
            //
            //     const prevIndex = Math.max(currentIndex - 1, 0);
            //
            //     const member = filteredMembers[prevIndex];
            //
            //     setActiveMember(member);
            // } else if (event.key === 'ArrowDown') {
            //     event.preventDefault();
            //     event.stopPropagation();
            //
            //     const currentIndex = filteredMembers.findIndex(({ id }) => id === activeMember?.id);
            //
            //     const nextIndex = Math.min(currentIndex + 1, filteredMembers.length - 1);
            //
            //     const member = filteredMembers[nextIndex];
            //
            //     setActiveMember(member);
            // } else if (event.key === 'Enter') {
            //     event.preventDefault();
            //     event.stopPropagation();
            //
            //     if (fullMatch && activeMember) {
            //         onSelect({ fullMatch, member: activeMember });
            //     }
            // }
        },
        [activeMember, filteredMembers, focusedIndex, fullMatch, onSelect],
    );

    const handleMemberClick = useCallback(
        (member: MentionMember) => {
            if (fullMatch) {
                onSelect({ fullMatch, member });
            }
        },
        [fullMatch, onSelect],
    );

    const handleMemberHover = useCallback((member: MentionMember) => {
        setActiveMember(member);
    }, []);

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
        [activeMember, filteredMembers, handleMemberClick, handleMemberHover],
    );

    const shouldShowPopup = useMemo(() => fullMatch && items.length > 0, [fullMatch, items.length]);

    useEffect(() => {
        if (shouldShowPopup) {
            window.addEventListener('keydown', handleKeyDown, true);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [handleKeyDown, shouldShowPopup]);

    return (
        <StyledMentionFinder className="beta-chayns-mention-finder">
            <AnimatePresence initial={false}>
                {shouldShowPopup && (
                    <StyledMotionMentionFinderPopup
                        ref={ref}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="prevent-lose-focus"
                        exit={{ height: 0, opacity: 0 }}
                        initial={{ height: 0, opacity: 0 }}
                        $popupAlignment={popupAlignment}
                        transition={{ duration: 0.15 }}
                        tabIndex={0}
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
