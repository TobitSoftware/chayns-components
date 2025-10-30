export interface IBaseItem {
    id: string;
}

export type BaseRef<T extends HTMLElement> = T & Record<string, any>;
