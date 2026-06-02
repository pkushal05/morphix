export type document = {
    sections: topic[];
};

export type topic = {
    title: HeadingBlock & { level: 1 };
    contents: contentBlock[];
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
    link?: AnchorBlock;
};

export type ListBlock = {
    type: "list";
    ordered: boolean;
    items: string[];
    link?: AnchorBlock;
};

export type AnchorBlock = {
    type: "anchor";
    href: string;
};


