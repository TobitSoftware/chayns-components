import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Comment } from './SocialPlugin.types';
import { markCommentAsDeleted, mergeComments } from './SocialPlugin.utils';
import { getPosting } from '../../api/posting/get';
import { postReaction } from '../../api/reaction/post';
import { deleteReaction } from '../../api/reaction/delete';
import { getComments } from '../../api/comments/get';
import { deleteComment } from '../../api/comments/delete';
import {
    createDialog,
    DialogButtonType,
    DialogType,
    getUser,
    login,
    useSite,
    useUser,
} from 'chayns-api';
import { postComment } from '../../api/comments/post';
import { MessageMetaData } from '../communication-message/CommunicationMessage.types';
import { useTranslation } from '@chayns/textstrings';
import textStrings from '../../constants/textStrings';

interface AddCommentOptions {
    text: string;
    parentCommentId?: Comment['id'];
    imageUrl?: string;
}

interface ISocialPluginContext {
    // Global
    commentType?: number;
    postingId?: string;

    // Comments
    comments: Comment[];
    commentCount: number;
    addComment: (comment: AddCommentOptions) => Promise<Comment['id'] | undefined>;
    deleteComment: (id: Comment['id']) => void;
    loadComments: () => Promise<boolean>;

    // Likes
    likeCount: number;
    hasLiked: boolean;
    like: VoidFunction;
    dislike: VoidFunction;

    // Reply
    replyMetadata?: MessageMetaData;
    setReplyMetadata: (metadata?: MessageMetaData) => void;
}

export const SocialPluginContext = createContext<ISocialPluginContext>({
    comments: [],
    commentCount: 0,
    likeCount: 0,
    hasLiked: false,
    addComment: () => Promise.resolve(undefined),
    loadComments: () => Promise.resolve(true),
    deleteComment: () => {},
    dislike: () => {},
    like: () => {},
    setReplyMetadata: () => {},
});

SocialPluginContext.displayName = 'SocialPluginContext';

export const useSocialPlugin = () => useContext(SocialPluginContext);

interface SocialPluginProviderProps {
    children: ReactNode;
    commentType: number;
    postingId: string;
}

const SocialPluginProvider: FC<SocialPluginProviderProps> = ({
    children,
    postingId,
    commentType,
}) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [replyMetadata, setReplyMetadata] = useState<MessageMetaData>();

    const commentSkipRef = useRef(0);

    const { personId, lastName, firstName } = useUser();
    const { locationId } = useSite();
    const { t } = useTranslation();

    const handleLoadComments = useCallback(async () => {
        const { status, data } = await getComments({
            postingId,
            commentType,
            skip: commentSkipRef.current,
        });

        if (status === 200 && data) {
            setComments((prev) => {
                const newComments = mergeComments(prev, data);

                commentSkipRef.current = newComments.length;

                return newComments;
            });
        }

        return true;
    }, [commentType, postingId]);

    const handleAddComment = useCallback(
        async ({ parentCommentId, text, imageUrl }: AddCommentOptions) => {
            if (!personId) {
                const { token } = await login();

                if (!token) {
                    return undefined;
                }
            }

            const { status, data } = await postComment({
                postingId,
                commentType,
                text,
                parentCommentId,
                imageUrl,
            });

            if (status !== 200 || !data) {
                return undefined;
            }

            const currentPersonId = getUser()?.personId ?? personId;

            if (!currentPersonId) {
                return undefined;
            }

            const newComment: Comment = {
                id: data,
                parentCommentId,
                imageUrl,
                text,
                creationTime: new Date().toISOString(),
                commentTypeId: commentType,
                personId: currentPersonId,
                lastName: lastName ?? '',
                firstName: firstName ?? '',
                originalPostingId: postingId,
                reactions: [],
                locationId,
            };

            setComments((prev) => mergeComments(prev, [newComment]));
            setCommentCount((prev) => prev + 1);

            return data;
        },
        [commentType, firstName, lastName, locationId, personId, postingId],
    );

    const handleDeleteComment = useCallback(
        (id: Comment['id']) => {
            void createDialog({
                type: DialogType.CONFIRM,
                text: t(textStrings.socialPlugin.content.dialog.delete),
            })
                .open()
                .then(({ buttonType }) => {
                    if (buttonType === DialogButtonType.OK) {
                        void deleteComment({ id }).then(({ status }) => {
                            if (status === 200) {
                                setComments((prev) => markCommentAsDeleted(prev, id));
                                setCommentCount((prev) => Math.max(prev - 1, 0));
                            }
                        });
                    }
                });
        },
        [t],
    );

    const handleLike = useCallback(() => {
        if (hasLiked) {
            return;
        }

        void postReaction({ postingId, commentType }).then(({ status }) => {
            if (status === 200) {
                setHasLiked(true);
                setLikeCount((prev) => prev + 1);
            }
        });
    }, [commentType, hasLiked, postingId]);

    const handleDislike = useCallback(() => {
        if (!hasLiked) {
            return;
        }

        void deleteReaction({ postingId, commentType }).then(({ status }) => {
            if (status === 200) {
                setHasLiked(false);
                setLikeCount((prev) => Math.max(prev - 1, 0));
            }
        });
    }, [commentType, hasLiked, postingId]);

    // Initial loading
    useEffect(() => {
        void getPosting({ postingId, commentType }).then(({ status, data }) => {
            if (status === 200 && data) {
                setCommentCount(data.commentCount);
                setLikeCount(data.likeCount);
                setHasLiked(data.userHasReacted);
            }
        });

        void handleLoadComments();
    }, [commentType, handleLoadComments, postingId]);

    const value = useMemo(
        () => ({
            comments,
            postingId,
            commentType,
            hasLiked,
            commentCount,
            likeCount,
            replyMetadata,
            setReplyMetadata: (metadata?: MessageMetaData) => setReplyMetadata(metadata),
            loadComments: handleLoadComments,
            like: handleLike,
            dislike: handleDislike,
            addComment: handleAddComment,
            deleteComment: handleDeleteComment,
        }),
        [
            comments,
            postingId,
            commentType,
            hasLiked,
            commentCount,
            likeCount,
            replyMetadata,
            handleLoadComments,
            handleLike,
            handleDislike,
            handleAddComment,
            handleDeleteComment,
        ],
    );

    return <SocialPluginContext.Provider value={value}>{children}</SocialPluginContext.Provider>;
};

SocialPluginProvider.displayName = 'SocialPluginProvider';

export default SocialPluginProvider;
