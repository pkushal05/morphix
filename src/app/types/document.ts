export type document = {
    documentTitle: string;
    sections: Record<string, topic>;
    sectionOrder: string[];
};

export type topic = {
    title: HeadingBlock & { level: 1 };
    contents: Record<string, contentBlock>;
    contentOrder: string[];
};

export type contentBlock = HeadingBlock | ParagraphBlock | ListBlock;

export type HeadingBlock = {
    type: "heading";
    level: number;
    text: string;
};

export type ParagraphBlock = {
    type: "paragraph";
    text: string;
    links?: AnchorBlock[];
};

export type ListBlock = {
    type: "list";
    ordered: boolean;
    items: {
        text: string;
        links?: AnchorBlock[];
    }[];
};

export type AnchorBlock = {
    type: "anchor";
    href: string;
    text: string;
};
