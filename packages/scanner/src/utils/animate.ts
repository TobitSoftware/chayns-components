export const animateNumericValue = (
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void,
) => {
    if (start === end) {
        callback(end);
        return;
    }

    const startTime = performance.now();
    const animate = () => {
        const currentTime = performance.now();
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = start + (end - start) * progress;
        callback(value);
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    animate();
};
