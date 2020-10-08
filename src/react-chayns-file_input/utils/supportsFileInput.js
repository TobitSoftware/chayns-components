export default function supportsFileInput() {
    return !((chayns.env.isApp || chayns.env.isMyChaynsApp) && chayns.env.isAndroid && chayns.env.myChaynsAppVersion < 6000);
}
