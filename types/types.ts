export type Style = "positive" | "science" | "movie";

export interface Prompt {
    input: string;
    style: Style;
}