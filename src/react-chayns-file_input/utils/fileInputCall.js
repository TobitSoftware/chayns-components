export default async function fileInputCall() {
    const uploadResult = await chayns.uploadCloudImage();
    const matches = uploadResult.url.match(/(\.[a-z]+)/g);
    const type = matches && matches.length ? matches[matches.length - 1] : '';
    const response = await fetch(uploadResult.url);
    const data = await response.blob();
    const metadata = {
        type: `image/${type.slice(1)}`,
    };
    const file = new File(
        [data],
        `androidCompatibilityUpload${type}`,
        metadata
    );

    return { target: { files: [file] } }; // compatibility event
}
