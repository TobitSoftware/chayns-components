import { openImage } from 'chayns-api';

export const copyToClipboard = (link: string) => {
    const aux = document.createElement('input');
    aux.setAttribute('value', link);
    aux.setAttribute('contenteditable', 'true');
    aux.setAttribute('readonly', 'true');

    document.body.appendChild(aux);

    try {
        const selection = window.getSelection();

        if (!selection) {
            return;
        }

        const range = document.createRange();
        aux.select();
        range.selectNodeContents(aux);
        selection.removeAllRanges();
        selection.addRange(range);
        aux.setSelectionRange(0, 999999);
        document.execCommand('copy');
    } finally {
        aux.remove();
    }
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
