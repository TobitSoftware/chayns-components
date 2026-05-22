import React, { FC, useCallback } from 'react';
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

interface SocialPluginBarProps {
    link: string;
    onCommentVisibilityChange: VoidFunction;
}

const SocialPluginBar: FC<SocialPluginBarProps> = ({ link, onCommentVisibilityChange }) => {
    const { t } = useTranslation();

    const handleLike = useCallback(() => {}, []);

    return (
        <StyledSocialPluginBar>
            <StyledSocialPluginBarCommentCount>2 Kommentare</StyledSocialPluginBarCommentCount>
            <StyledSocialPluginBarDivider />
            <StyledSocialPluginBarItems>
                <StyledSocialPluginBarItemsSide>
                    <StyledSocialPluginBarItem onClick={handleLike}>
                        <Icon icons={['fa fa-thumbs-up']} />
                        <StyledSocialPluginBarItemText>
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
