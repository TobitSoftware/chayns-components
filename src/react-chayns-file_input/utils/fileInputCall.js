export default async function fileInputCall() {
    const uploadResult = await chayns.uploadCloudImage();
    const type = uploadResult.url.match(/(\.[a-z]+)/g)[0];
    const response = await fetch(uploadResult.url);
    const data = await response.blob();
    const metadata = {
        type: `image/${type}`,
    };
    const file = new File([data], `androidCompatibilityUpload${type}`, metadata);

    return { target: { files: [file] } }; // compatibility event
}
