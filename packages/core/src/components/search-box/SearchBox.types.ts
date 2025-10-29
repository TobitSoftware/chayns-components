export interface ISearchBoxItems {
    groupName?: string;
    list: ISearchBoxItem[];
}

export interface ISearchBoxItem {
    text: string;
    id: string;
    imageUrl?: string;
}
