export const SKIN_TONE_REGEX = new RegExp('\ud83c[\udffb-\udfff]', 'g');
export const IS_EDGE_WITH_CHROMIUM = new RegExp('/edg\\/\\d+/i');

export const isEnterKey = (event: KeyboardEvent) => isKey(event, 'enter', 13);
export const isShiftKey = (event: KeyboardEvent) => isKey(event, 'shift', 16);
export const isCursorMovement = (event: KeyboardEvent) =>
    isKey(event, 'PageUp', 33) ||
    isKey(event, 'PageDown', 34) ||
    isKey(event, 'End', 35) ||
    isKey(event, 'Home', 36) ||
    isKey(event, 'ArrowLeft', 37) ||
    isKey(event, 'ArrowUp', 38) ||
    isKey(event, 'ArrowRight', 39) ||
    isKey(event, 'ArrowDown', 40);

const isKey = (event: KeyboardEvent, codeString: string, code: number) =>
    event.key === codeString ||
    event.which === code ||
    event.keyCode === code ||
    event.charCode === code;
