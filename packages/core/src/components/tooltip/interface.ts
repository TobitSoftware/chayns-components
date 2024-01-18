export interface ITooltipItem {
    headline?: string;
    text: string;
    imageUrl?: string;
    button?: { text: string; onClick: () => void };
}
