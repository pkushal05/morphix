export type NodeTypes =
    | "documentTitle"
    | "pageBreak"
    | "topicTitle"
    | "heading"
    | "paragraph"
    | "list"
    | "anchor"
    | "unknown";

export type DetectedNode = {
    type: NodeTypes;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
};
