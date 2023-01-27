interface GetTextByCharCountOptions {
    charCount: number;
    fullText: string;
}

export const getTextByCharCount = ({ charCount, fullText }: GetTextByCharCountOptions): string =>
    fullText.substring(0, charCount);
