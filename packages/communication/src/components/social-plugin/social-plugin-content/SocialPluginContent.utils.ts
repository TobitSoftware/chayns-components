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

    element.scrollTop = element.scrollHeight;
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
