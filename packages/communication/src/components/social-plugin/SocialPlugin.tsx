import React, { FC, useState } from 'react';
import { SocialPluginProps } from './SocialPlugin.types';
import { StyledSocialPlugin } from './SocialPlugin.styles';
import SocialPluginProvider from './SocialPlugin.context';
import SocialPluginBar from './social-plugin-bar/SocialPluginBar';
import { TextStringProviderSSR } from '@chayns/textstrings';
import SocialPluginContent from './social-plugin-content/SocialPluginContent';

const SocialPlugin: FC<SocialPluginProps> = ({ link, postingId, commentType }) => {
    const [shouldShowComments, setShouldSHowComments] = useState(false);

    return (
        <SocialPluginProvider commentType={commentType} postingId={postingId}>
            <TextStringProviderSSR
                libraries="chayns-components-v5-communication"
                id="social-plugin"
            >
                <StyledSocialPlugin>
                    <SocialPluginBar
                        link={link}
                        onCommentVisibilityChange={() => setShouldSHowComments((prev) => !prev)}
                    />
                    <SocialPluginContent shouldShowComments={shouldShowComments} />
                </StyledSocialPlugin>
            </TextStringProviderSSR>
        </SocialPluginProvider>
    );
};

SocialPlugin.displayName = 'SocialPlugin';

export default SocialPlugin;
