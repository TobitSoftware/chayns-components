import { ColorMode } from 'chayns-api';

export interface DesignSettings {
    siteId?: string;
    color: string;
    secondaryColor?: string;
    colorMode: ColorMode;
    fontSize: number;
    iconStyle: IconStyle;
    headlineFontId?: number;
    backgroundType?: number;
    backgroundColor?: string;
    headerBarColor?: string;
    accordionIcon?: number;
    accordionLines: boolean;
    cardBorderRadius?: number;
    cardBackgroundOpacity?: number;
    cardShadow?: number;
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
    fontSizePx?: number;
    lineHeight?: number;
    marginBeforePx?: number;
    marginAfterPx?: number;
    color?: string;
    fontId?: number;
    buttonDesignType?: number;
    backgroundColor?: string;
}
