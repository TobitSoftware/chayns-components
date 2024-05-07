import { createDialog, DialogType, openImage } from 'chayns-api';

export const copyToClipboard = (link: string) => {
    const aux = document.createElement('input');

    const range = document.createRange();

    aux.setAttribute('value', link);
    aux.setAttribute('contenteditable', 'true');
    aux.setAttribute('readonly', 'true');

    document.body.appendChild(aux);

    aux.select();

    range.selectNodeContents(aux);

    const s = window.getSelection();

    if (!s) {
        return;
    }

    s.removeAllRanges();
    s.addRange(range);

    aux.setSelectionRange(0, 999999);

    document.execCommand('copy');

    document.body.removeChild(aux);

    void createDialog({
        type: DialogType.TOAST,
        showCloseIcon: true,
        toastType: 1,
        text: 'kopiert',
    }).open();
};

export const shareWithApp = (link: string) => {
    window.location.href = `mailto:?subject=&body=${encodeURIComponent(link)}`;
};

export const shareWithUrl = (link: string) => {
    if (link.startsWith('mailto')) {
        window.open(link);
    } else if (link.indexOf('chaynsqrcodegenerator') > 0) {
        void openImage({ items: [{ url: link }] });
    } else {
        window.open(link, '_blank');
    }
};
