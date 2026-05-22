import React, { FC, useCallback, useState, KeyboardEvent, useMemo } from 'react';
import {
    StyledSocialPluginContent,
    StyledSocialPluginContentComments,
    StyledSocialPluginContentRightElement,
} from './SocialPluginContent.styles';
import { ExpandableContent, Icon } from '@chayns-components/core';
import CommunicationInput from '../../communication-input/CommunicationInput';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';
import {
    CommunicationInputCornerType,
    CommunicationInputSize,
} from '../../communication-input/CommunicationInput.types';

interface SocialPluginContentProps {
    shouldShowComments: boolean;
}

const SocialPluginContent: FC<SocialPluginContentProps> = ({ shouldShowComments }) => {
    const [value, setValue] = useState('');

    const { t } = useTranslation();

    const canSend = useMemo(() => {
        const checkValue = value.replaceAll('<br>', '').trim();

        return checkValue.length > 0;
    }, [value]);

    const handleSend = useCallback(() => {}, []);

    const handleInput = useCallback((_: unknown, newValue: string) => {
        setValue(newValue);
    }, []);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (!event.shiftKey && event.key === 'Enter' && canSend) {
                handleSend();
            }
        },
        [canSend, handleSend],
    );

    return (
        <ExpandableContent isOpen={shouldShowComments}>
            <StyledSocialPluginContent>
                <StyledSocialPluginContentComments className="chayns-scrollbar">
                    t
                </StyledSocialPluginContentComments>
                <CommunicationInput
                    inputConfig={{
                        placeholder: t(textStrings.socialPlugin.content.input.placeholder),
                        onInput: handleInput,
                        onKeyDown: handleKeyDown,
                        maxHeight: 200,
                        value,
                    }}
                    shouldDisableFullHeight
                    cornerType={CommunicationInputCornerType.ROUNDED}
                    size={CommunicationInputSize.SMALL}
                    rightElement={
                        <StyledSocialPluginContentRightElement
                            $isDisabled={!canSend}
                            onClick={handleSend}
                        >
                            <Icon icons={['fa fa-paper-plane']} />
                        </StyledSocialPluginContentRightElement>
                    }
                />
            </StyledSocialPluginContent>
        </ExpandableContent>
    );
};

SocialPluginContent.displayName = 'SocialPluginContent';

export default SocialPluginContent;
