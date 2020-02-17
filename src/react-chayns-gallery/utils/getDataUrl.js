export function getDataUrlFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function getDataUrlFromBase64(base64) {
    if (!base64.startsWith('data:image/*;base64,')) {
        return `data:image/*;base64,${base64}`;
    }
    return base64;
}
