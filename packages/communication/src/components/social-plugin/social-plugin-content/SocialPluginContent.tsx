import React, {
    FC,
    useCallback,
    useMemo,
    useRef,
    useState,
    KeyboardEvent,
    useEffect,
    useLayoutEffect,
} from 'react';
import {
    StyledSocialPluginContent,
    StyledSocialPluginContentComments,
    StyledSocialPluginContentCommentsInner,
    StyledSocialPluginContentRightElement,
    StyledSocialPluginContentTopContent,
    StyledSocialPluginImage,
    StyledSocialPluginImageWrapper,
    StyledSocialPluginImageXmark,
} from './SocialPluginContent.styles';
import {
    ContextMenuItem,
    ExpandableContent,
    Icon,
    selectFiles,
    uploadFile,
    type Image,
    type InternalFileItem,
} from '@chayns-components/core';
import CommunicationInput from '../../communication-input/CommunicationInput';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../../constants/textStrings';
import {
    CommunicationInputCornerType,
    CommunicationInputSize,
} from '../../communication-input/CommunicationInput.types';
import { useSocialPlugin } from '../SocialPlugin.context';
import SocialPluginMessage from './social-plugin-message/SocialPluginMessage';
import { countComments, sortComments } from '../SocialPlugin.utils';
import PreviewMessage from '../../communication-message/preview-message/PreviewMessage';
import {
    generateImagePreviewUrl,
    restoreScrollPositionAfterPrepend,
    scheduleScrollElementToBottom,
    scrollToComment,
} from './SocialPluginContent.utils';
import { replaceEmojis } from '../../../utils/emojione';

interface SocialPluginContentProps {
    shouldShowComments: boolean;
}

const SocialPluginContent: FC<SocialPluginContentProps> = ({ shouldShowComments }) => {
    const [value, setValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [image, setImage] = useState<InternalFileItem>();

    const listRef = useRef<HTMLDivElement>(null);
    const pendingRequestRef = useRef(false);
    const previousScrollHeightRef = useRef(0);
    const previousScrollTopRef = useRef(0);
    const shouldRestoreScrollPositionRef = useRef(false);

    const { t } = useTranslation();

    const { comments, commentCount, addComment, replyMetadata, setReplyMetadata, loadComments } =
        useSocialPlugin();

    useEffect(() => {
        if (!shouldShowComments) {
            return undefined;
        }

        return scheduleScrollElementToBottom(listRef.current);
    }, [shouldShowComments]);

    const restorePendingScrollPosition = useCallback(() => {
        if (!shouldRestoreScrollPositionRef.current) {
            return;
        }

        restoreScrollPositionAfterPrepend(
            listRef.current,
            previousScrollHeightRef.current,
            previousScrollTopRef.current,
        );

        shouldRestoreScrollPositionRef.current = false;
    }, []);

    const canSend = useMemo(() => {
        const checkValue = value.replaceAll('<br>', '').trim();
        const hasUploadedImage = Boolean(image);
        const isImagePending = Boolean(image && image.state !== 'uploaded');

        return checkValue.length > 0 || (hasUploadedImage && !isImagePending);
    }, [image, value]);

    const handleSend = useCallback(() => {
        if (!canSend || isSending) {
            return;
        }

        setIsSending(true);

        void addComment({
            parentCommentId: replyMetadata ? Number(replyMetadata.id) : undefined,
            text: value,
            imageUrl: image?.uploadedFile?.url,
        }).then((id) => {
            setIsSending(false);

            if (id) {
                setValue('');
                setImage(undefined);
                setReplyMetadata(undefined);

                if (listRef.current) {
                    scrollToComment(id, listRef.current);
                }
            }
        });
    }, [
        addComment,
        canSend,
        image?.uploadedFile?.url,
        isSending,
        replyMetadata,
        setReplyMetadata,
        value,
    ]);

    const handleInput = useCallback((_: unknown, newValue: string) => {
        setValue(newValue);
    }, []);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (!event.shiftKey && event.key === 'Enter' && canSend) {
                event.preventDefault();
                handleSend();
            }
        },
        [canSend, handleSend],
    );

    const sortedComments = useMemo(() => sortComments(comments), [comments]);

    const hasLoadedAllComments = useMemo(
        () => countComments(sortedComments) >= commentCount,
        [commentCount, sortedComments],
    );

    const messages = useMemo(
        () =>
            sortedComments.map(
                ({
                    comments: childComments,
                    id,
                    text,
                    creationTime,
                    firstName,
                    lastName,
                    personId,
                    deletionTime,
                    imageUrl,
                }) => (
                    <SocialPluginMessage
                        key={id}
                        id={id}
                        comments={childComments}
                        personId={personId}
                        creationTime={creationTime}
                        deletionTime={deletionTime}
                        firstName={firstName}
                        lastName={lastName}
                        text={replaceEmojis(text)}
                        imageUrl={imageUrl}
                    />
                ),
            ),
        [sortedComments],
    );

    const topContent = useMemo(() => {
        if (!replyMetadata && !image) {
            return null;
        }

        return (
            <StyledSocialPluginContentTopContent>
                {replyMetadata && (
                    <PreviewMessage
                        metadata={replyMetadata}
                        onRemove={() => setReplyMetadata(undefined)}
                    />
                )}
                {image && (
                    <StyledSocialPluginImageWrapper>
                        <StyledSocialPluginImageXmark onClick={() => setImage(undefined)}>
                            <Icon icons={['fa fa-xmark']} />
                        </StyledSocialPluginImageXmark>
                        <StyledSocialPluginImage
                            src={image.uploadedFile?.url || image.previewUrl}
                        />
                    </StyledSocialPluginImageWrapper>
                )}
            </StyledSocialPluginContentTopContent>
        );
    }, [image, replyMetadata, setReplyMetadata]);

    const handleAddImage = useCallback(() => {
        void selectFiles({ type: 'image/*', multiple: false })
            .then(async (files) => {
                if (!files || files.length === 0) {
                    return;
                }

                const fileToUpload = files[0];

                if (!fileToUpload) {
                    return;
                }

                const previewUrl = await generateImagePreviewUrl(fileToUpload);

                const internalFile: InternalFileItem = {
                    id: 'file',
                    file: fileToUpload,
                    previewUrl,
                    state: 'none',
                };

                setImage(internalFile);

                const uploadCallback = (uploadedFile: Image) => {
                    setImage((prev) => {
                        if (!prev) {
                            return prev;
                        }

                        return {
                            ...prev,
                            state: 'uploaded',
                            uploadedFile,
                        };
                    });
                };

                await uploadFile({
                    fileToUpload: internalFile,
                    shouldUploadImageToSite: true,
                    callback: uploadCallback,
                });
            })
            .catch(() => undefined);
    }, []);

    const contextMenuItems: ContextMenuItem[] = useMemo(
        () => [
            {
                key: 'image',
                text: t(textStrings.socialPlugin.content.input.options.image),
                onClick: handleAddImage,
                icons: ['fa fa-image'],
            },
        ],
        [handleAddImage, t],
    );

    useEffect(() => {
        const element = listRef.current;

        if (!element) {
            return undefined;
        }

        const handleScroll = () => {
            if (element.scrollTop > 10 || pendingRequestRef.current || hasLoadedAllComments) {
                return;
            }

            pendingRequestRef.current = true;
            previousScrollHeightRef.current = element.scrollHeight;
            previousScrollTopRef.current = element.scrollTop;
            shouldRestoreScrollPositionRef.current = true;

            void loadComments()
                .then((success) => {
                    pendingRequestRef.current = !success;

                    if (!success) {
                        shouldRestoreScrollPositionRef.current = false;
                        return;
                    }

                    requestAnimationFrame(() => {
                        restorePendingScrollPosition();
                    });
                })
                .catch(() => {
                    pendingRequestRef.current = false;
                    shouldRestoreScrollPositionRef.current = false;
                });
        };

        element.addEventListener('scroll', handleScroll);

        return () => {
            element.removeEventListener('scroll', handleScroll);
        };
    }, [hasLoadedAllComments, loadComments, restorePendingScrollPosition]);

    useLayoutEffect(() => {
        restorePendingScrollPosition();
    }, [comments, restorePendingScrollPosition]);

    return (
        <ExpandableContent isOpen={shouldShowComments}>
            <StyledSocialPluginContent>
                <StyledSocialPluginContentComments className="chayns-scrollbar" ref={listRef}>
                    <StyledSocialPluginContentCommentsInner>
                        {messages}
                    </StyledSocialPluginContentCommentsInner>
                </StyledSocialPluginContentComments>
                <CommunicationInput
                    inputConfig={{
                        placeholder: t(textStrings.socialPlugin.content.input.placeholder),
                        onInput: handleInput,
                        onKeyDown: handleKeyDown,
                        maxHeight: 200,
                        value,
                        isDisabled: isSending,
                    }}
                    topContent={topContent}
                    scrollContainerRef={listRef}
                    shouldDisableFullHeight
                    contextMenuItems={contextMenuItems}
                    cornerType={CommunicationInputCornerType.ROUNDED}
                    size={CommunicationInputSize.SMALL}
                    rightElement={
                        <StyledSocialPluginContentRightElement
                            $isDisabled={!canSend || isSending}
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
