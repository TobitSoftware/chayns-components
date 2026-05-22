import React, { FC, useCallback, useMemo } from 'react';
import {
    StyledSocialPluginBar,
    StyledSocialPluginBarCommentCount,
    StyledSocialPluginBarDivider,
    StyledSocialPluginBarItem,
    StyledSocialPluginBarItems,
    StyledSocialPluginBarItemsSide,
    StyledSocialPluginBarItemText,
} from './SocialPluginBar.styles';
import { ContextMenuAlignment, Icon, SharingBar } from '@chayns-components/core';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';
import { useSocialPlugin } from '../SocialPlugin.context';

interface SocialPluginBarProps {
    link: string;
    onCommentVisibilityChange: VoidFunction;
}

const SocialPluginBar: FC<SocialPluginBarProps> = ({ link, onCommentVisibilityChange }) => {
    const { t } = useTranslation();

    const { likeCount, hasLiked, commentCount } = useSocialPlugin();

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
                        '##count##': likeCount - 1,
                    });
                }
            } else {
                likeLabel = t(textStrings.socialPlugin.bar.footer.likedByMultiplePeople, {
                    '##count##': likeCount - 1,
                });
            }
        }

        if (commentCount > 0) {
            commentLabel =
                commentCount === 1
                    ? t(textStrings.socialPlugin.bar.footer.oneComment)
                    : t(textStrings.socialPlugin.bar.footer.multipleComments, {
                          '##count##': commentCount,
                      });
        }

        return [likeLabel, commentLabel].filter(Boolean).join(', ');
    }, [likeCount, commentCount, hasLiked, t]);

    const handleLike = useCallback(() => {}, []);

    return (
        <StyledSocialPluginBar>
            <StyledSocialPluginBarCommentCount>{label}</StyledSocialPluginBarCommentCount>
            <StyledSocialPluginBarDivider />
            <StyledSocialPluginBarItems>
                <StyledSocialPluginBarItemsSide>
                    <StyledSocialPluginBarItem onClick={handleLike}>
                        <Icon icons={['fa fa-thumbs-up']} />
                        <StyledSocialPluginBarItemText $shouldHighlight={hasLiked}>
                            {t(textStrings.socialPlugin.bar.like)}
                        </StyledSocialPluginBarItemText>
                    </StyledSocialPluginBarItem>
                    <StyledSocialPluginBarItem onClick={onCommentVisibilityChange}>
                        <Icon icons={['fa fa-comment']} />
                        <StyledSocialPluginBarItemText>
                            {t(textStrings.socialPlugin.bar.comment)}
                        </StyledSocialPluginBarItemText>
                    </StyledSocialPluginBarItem>
                </StyledSocialPluginBarItemsSide>
                <StyledSocialPluginBarItemsSide>
                    <SharingBar
                        label="Teilen"
                        link={link}
                        popupAlignment={ContextMenuAlignment.TopLeft}
                    />
                </StyledSocialPluginBarItemsSide>
            </StyledSocialPluginBarItems>
        </StyledSocialPluginBar>
    );
};

SocialPluginBar.displayName = 'SocialPluginBar';

export default SocialPluginBar;
