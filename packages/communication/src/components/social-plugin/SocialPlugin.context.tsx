import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { Comment } from './SocialPlugin.types';

interface ISocialPluginContext {
    comments: Comment[];
    addComment?: (comment: Comment) => void;
    deleteComment?: (id: Comment['id']) => void;
}

export const SocialPluginContext = createContext<ISocialPluginContext>({
    comments: [],
    addComment: () => {},
    deleteComment: () => {},
});

SocialPluginContext.displayName = 'SocialPluginContext';

export const useSocialPlugin = () => useContext(SocialPluginContext);

interface SocialPluginProviderProps {
    children: ReactNode;
}

const SocialPluginProvider: FC<SocialPluginProviderProps> = ({ children }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const handleAddComment = useCallback((comment: Comment) => {
        setComments((prev) => prev.concat([comment]));
    }, []);

    const handleDeleteComment = useCallback((id: Comment['id']) => {}, []);

    const value = useMemo(
        () => ({
            comments,
            addComment: handleAddComment,
            deleteComment: handleDeleteComment,
        }),
        [comments, handleAddComment, handleDeleteComment],
    );

    return <SocialPluginContext.Provider value={value}>{children}</SocialPluginContext.Provider>;
};

SocialPluginProvider.displayName = 'SocialPluginProvider';

export default SocialPluginProvider;
