export const SKIN_TONE_REGEX = new RegExp('\ud83c[\udffb-\udfff]', 'g');
export const IS_EDGE_WITH_CHROMIUM = new RegExp('/edg\\/\\d+/i');

export const isEnterKey = (event: KeyboardEvent) => isKey(event, 'Enter', 13);
export const isSpaceKey = (event: KeyboardEvent) => isKey(event, ' ', 32);
export const isCtrlV = (event: KeyboardEvent) => isKey(event, 'v', 86) && event.ctrlKey;
export const isCtrlZ = (event: KeyboardEvent) => isKey(event, 'z', 90) && event.ctrlKey;
export const isCtrlY = (event: KeyboardEvent) => isKey(event, 'y', 89) && event.ctrlKey;
export const isCtrlA = (event: KeyboardEvent) => isKey(event, 'a', 65) && event.ctrlKey;

export const isCapsShiftCtrlAltEscFKeyNumLock = (event: KeyboardEvent) => {
    let fKey = false;
    for (let i = 1; i < 13; i++) {
        if (isKey(event, `F${i}`, 111 + i)) {
            fKey = true;
            break;
        }
    }
    return (
        isKey(event, 'CapsLock', 20) ||
        isKey(event, 'Shift', 16) ||
        isKey(event, 'Control', 17) ||
        isKey(event, 'Alt', 18) ||
        isKey(event, 'NumLock', 144) ||
        fKey
    );
};
export const isCursorMove = (event: KeyboardEvent) =>
    isKey(event, 'ArrowLeft', 37) ||
    isKey(event, 'ArrowUp', 38) ||
    isKey(event, 'ArrowRight', 39) ||
    isKey(event, 'ArrowDown', 40) ||
    isKey(event, 'Home', 36) ||
    isKey(event, 'End', 35) ||
    isKey(event, 'PageUp', 33) ||
    isKey(event, 'PageDown', 34);

const isKey = (event: KeyboardEvent, codeString: string, code: number) =>
    event.key === codeString ||
    event.which === code ||
    event.keyCode === code ||
    event.charCode === code;
