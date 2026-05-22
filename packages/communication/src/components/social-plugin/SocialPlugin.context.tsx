import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Comment } from './SocialPlugin.types';
import { getPosting } from '../../api/posting/get';

interface ISocialPluginContext {
    // Global
    commentType?: number;
    postingId?: string;

    // Comments
    comments: Comment[];
    commentCount: number;
    addComment?: (comment: Comment) => void;
    deleteComment?: (id: Comment['id']) => void;

    // Likes
    likeCount: number;
    hasLiked: boolean;
}

export const SocialPluginContext = createContext<ISocialPluginContext>({
    comments: [],
    commentCount: 0,
    likeCount: 0,
    hasLiked: false,
    addComment: () => {},
    deleteComment: () => {},
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

    useEffect(() => {
        void getPosting({ postingId, commentType }).then(({ status, data }) => {
            if (status === 200 && data) {
                setCommentCount(data.commentCount);
                setLikeCount(data.likeCount);
                setHasLiked(data.userHasReacted);
            }
        });
    }, [commentType, postingId]);

    const handleAddComment = useCallback((comment: Comment) => {
        setComments((prev) => prev.concat([comment]));
    }, []);

    const handleDeleteComment = useCallback((id: Comment['id']) => {}, []);

    const value = useMemo(
        () => ({
            comments,
            postingId,
            commentType,
            hasLiked,
            commentCount,
            likeCount,
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
            handleAddComment,
            handleDeleteComment,
        ],
    );

    return <SocialPluginContext.Provider value={value}>{children}</SocialPluginContext.Provider>;
};

SocialPluginProvider.displayName = 'SocialPluginProvider';

export default SocialPluginProvider;
