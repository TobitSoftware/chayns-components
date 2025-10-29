export const loadScript = (src: string): Promise<Event | UIEvent> =>
    new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onabort = reject;
        document.head.appendChild(script);
    });
