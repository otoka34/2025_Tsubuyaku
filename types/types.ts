export type Style = "positive" | "science" | "movie" | "hackathon";

export interface Prompt {
    input: string;
    style: Style;
}