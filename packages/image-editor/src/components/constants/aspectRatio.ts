export enum ImageEditorAspectRatio {
    // width = ratio * height
    ratio_16_9 = 16 / 9,
    ratio_16_10 = 16 / 10,
    ratio_4_3 = 4 / 3,
    ratio_3_2 = 3 / 2,
    ratio_1_1 = 1,
    ratio_21_9 = 21 / 9,
    // smartphones
    ratio_9_16 = 9 / 16,
    ratio_9_18 = 9 / 18,
    ratio_9_19p5 = 9 / 19.5,
    // smartphones landscape
    ratio_18_9 = 18 / 9,
    ratio_19p5_9 = 19.5 / 9,
}

export interface Resolution {
    width: number;
    height: number;
}
