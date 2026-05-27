import { Comment } from '../SocialPlugin.types';

export const generateImagePreviewUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const previewUrl = event.target?.result;

            if (typeof previewUrl === 'string') {
                resolve(previewUrl);
                return;
            }

            reject(new Error('Could not generate image preview.'));
        };

        reader.onerror = () => {
            reject(new Error('Could not generate image preview.'));
        };

        reader.readAsDataURL(file);
    });

export const scrollElementToBottom = (element: HTMLDivElement | null): void => {
    if (!element) {
        return;
    }

    element.scrollTo({
        top: element.scrollHeight,
    });
};

export const scheduleScrollElementToBottom = (element: HTMLDivElement | null): VoidFunction => {
    let innerAnimationFrameId = 0;

    const outerAnimationFrameId = requestAnimationFrame(() => {
        innerAnimationFrameId = requestAnimationFrame(() => {
            scrollElementToBottom(element);
        });
    });

    return () => {
        cancelAnimationFrame(outerAnimationFrameId);
        cancelAnimationFrame(innerAnimationFrameId);
    };
};

export const restoreScrollPositionAfterPrepend = (
    element: HTMLDivElement | null,
    previousScrollHeight: number,
    previousScrollTop: number,
): void => {
    if (!element) {
        return;
    }

    element.scrollTo({
        top: previousScrollTop + (element.scrollHeight - previousScrollHeight),
    });
};

export const scrollToComment = (commentId: Comment['id'], element: Element): void => {
    const target = element.querySelector<HTMLElement>(`[data-comment-id="${commentId}"]`);

    if (!target) {
        return;
    }

    const wrapper = target.parentElement;

    if (!wrapper) {
        return;
    }

    element.scrollTo(0, wrapper.offsetTop - target.offsetTop);
};
