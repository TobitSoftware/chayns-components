export interface DesignSettings {
    accordionIcon: number;
    accordionLines: boolean;
    cardBorderRadius: number;
    cardBackgroundOpacity: number;
    cardShadow: number;
    iconStyle: IconStyle;
}

export enum IconStyle {
    SOLID,
    REGULAR,
    LIGHT,
    DUOTONE,
    SHARP,
}

export interface ParagraphFormat {
    selector: string;
    fontSizePx: number | null;
    lineHeight: number | null;
    marginBeforePx: number | null;
    marginAfterPx: number | null;
    color: string | null;
    fontId: number | null;
    backgroundColor: string | null;
    design: number | null;
    fontName: string | null;
    fontFactor: number | null;
    letterSpacing: number | null;
    wordSpacing: number | null;
    fontBackup: string | null;
    fontHasBold: boolean | null;
}
