import React, { FC, useCallback, useMemo, useRef } from 'react';
import {
    StyledSocialPluginBar,
    StyledSocialPluginBarCommentCount,
    StyledSocialPluginBarDivider,
    StyledSocialPluginBarItem,
    StyledSocialPluginBarItems,
    StyledSocialPluginBarItemsSide,
    StyledSocialPluginBarItemText,
} from './SocialPluginBar.styles';
import {
    ContextMenuAlignment,
    Icon,
    SharingBar,
    useFocusRingPortal,
    useKeyboardFocusHighlighting,
} from '@chayns-components/core';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';
import { useSocialPlugin } from '../SocialPlugin.context';

interface SocialPluginBarProps {
    link: string;
    onCommentVisibilityChange: VoidFunction;
    shouldEnableKeyboardHighlighting?: boolean;
}

const SocialPluginBar: FC<SocialPluginBarProps> = ({
    link,
    onCommentVisibilityChange,
    shouldEnableKeyboardHighlighting,
}) => {
    const { t } = useTranslation();
    const likeRef = useRef<HTMLButtonElement>(null);
    const commentRef = useRef<HTMLButtonElement>(null);
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );

    useFocusRingPortal(likeRef, { isEnabled: shouldShowKeyboardHighlighting, padding: 4 });
    useFocusRingPortal(commentRef, { isEnabled: shouldShowKeyboardHighlighting, padding: 4 });

    const { likeCount, hasLiked, commentCount, like, dislike } = useSocialPlugin();

    const label = useMemo(() => {
        let likeLabel = '';
        let commentLabel = '';

        if (likeCount > 0) {
            if (likeCount === 1) {
                likeLabel = hasLiked
                    ? t(textStrings.socialPlugin.bar.footer.likedByYou)
                    : t(textStrings.socialPlugin.bar.footer.likedByOnePerson);
            } else if (hasLiked) {
                if (likeCount === 2) {
                    likeLabel = t(textStrings.socialPlugin.bar.footer.likedByYouAndOnePerson);
                } else {
                    likeLabel = t(textStrings.socialPlugin.bar.footer.likedByYouAndMultiplePeople, {
                        count: likeCount - 1,
                    });
                }
            } else {
                likeLabel = t(textStrings.socialPlugin.bar.footer.likedByMultiplePeople, {
                    count: likeCount - 1,
                });
            }
        }

        if (commentCount > 0) {
            commentLabel =
                commentCount === 1
                    ? t(textStrings.socialPlugin.bar.footer.oneComment)
                    : t(textStrings.socialPlugin.bar.footer.multipleComments, {
                          count: commentCount,
                      });
        }

        return [likeLabel, commentLabel].filter(Boolean).join(', ');
    }, [likeCount, commentCount, hasLiked, t]);

    const handleLike = useCallback(() => {
        if (hasLiked) {
            dislike();
        } else {
            like();
        }
    }, [dislike, hasLiked, like]);

    return (
        <StyledSocialPluginBar>
            <StyledSocialPluginBarCommentCount>{label}</StyledSocialPluginBarCommentCount>
            <StyledSocialPluginBarDivider />
            <StyledSocialPluginBarItems>
                <StyledSocialPluginBarItemsSide>
                    <StyledSocialPluginBarItem onClick={handleLike} ref={likeRef} type="button">
                        <Icon
                            icons={[`${hasLiked ? 'fas' : 'fa'} fa-thumbs-up`]}
                            color={hasLiked ? 'var(--chayns-color--primary)' : undefined}
                        />
                        <StyledSocialPluginBarItemText $shouldHighlight={hasLiked}>
                            {t(textStrings.socialPlugin.bar.like)}
                        </StyledSocialPluginBarItemText>
                    </StyledSocialPluginBarItem>
                    <StyledSocialPluginBarItem
                        onClick={onCommentVisibilityChange}
                        ref={commentRef}
                        type="button"
                    >
                        <Icon icons={['fa fa-comment']} />
                        <StyledSocialPluginBarItemText>
                            {t(textStrings.socialPlugin.bar.comment)}
                        </StyledSocialPluginBarItemText>
                    </StyledSocialPluginBarItem>
                </StyledSocialPluginBarItemsSide>
                <StyledSocialPluginBarItemsSide>
                    <SharingBar
                        label={t(textStrings.socialPlugin.bar.share)}
                        link={link}
                        popupAlignment={ContextMenuAlignment.TopLeft}
                        shouldEnableKeyboardHighlighting={shouldEnableKeyboardHighlighting}
                    />
                </StyledSocialPluginBarItemsSide>
            </StyledSocialPluginBarItems>
        </StyledSocialPluginBar>
    );
};

SocialPluginBar.displayName = 'SocialPluginBar';

export default SocialPluginBar;
