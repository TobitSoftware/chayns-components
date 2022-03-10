export const SKIN_TONE_REGEX = new RegExp('\ud83c[\udffb-\udfff]', 'g');
export const IS_EDGE_WITH_CHROMIUM = new RegExp('/edg\\/\\d+/i');

export const isEnterKey = (event: KeyboardEvent) => isKey(event, 'enter', 13);
export const isShiftKey = (event: KeyboardEvent) => isKey(event, 'shift', 16);

const isKey = (event: KeyboardEvent, codeString: string, code: number) =>
    event.key === codeString ||
    event.which === code ||
    event.keyCode === code ||
    event.charCode === code;
