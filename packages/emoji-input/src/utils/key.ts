export const SKIN_TONE_REGEX = new RegExp('\ud83c[\udffb-\udfff]', 'g');
export const IS_EDGE_WITH_CHROMIUM = new RegExp('/edg\\/\\d+/i');

export const isEnterKey = (event: KeyboardEvent) => isKey(event, 'Enter', 13);
export const isSpaceKey = (event: KeyboardEvent) => isKey(event, ' ', 32);
export const isCtrlV = (event: KeyboardEvent) => isKey(event, 'v', 86) && event.ctrlKey;
export const isCtrlZ = (event: KeyboardEvent) => isKey(event, 'z', 90) && event.ctrlKey;
export const isCtrlY = (event: KeyboardEvent) => isKey(event, 'y', 89) && event.ctrlKey;

const isKey = (event: KeyboardEvent, codeString: string, code: number) =>
    event.key === codeString ||
    event.which === code ||
    event.keyCode === code ||
    event.charCode === code;
